import { ITodo } from 'app.modules/types/todo';
import React, { useState } from 'react';

interface Props {
	todo: ITodo;
	onDeleteTodo: (id: ITodo['id']) => Promise<void>;
	onUpdateTodo: (id: ITodo['id'], todo: ITodo['todo'], isCompleted: ITodo['isCompleted']) => Promise<boolean>;
}
export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo }: Props) {
	const [todoItem, setTodoItem] = useState<ITodo>(todo); // for optimistic ui
	const [isEditFormVisible, setIsEditFormVisible] = useState<boolean>(false);
	const [updatedTodo, setUpdatedTodo] = useState<string>(todo.todo);
	const updateTodoHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const snapShot = { ...todoItem };
		setTodoItem(() => ({
			...snapShot,
			todo: updatedTodo,
		}));
		setIsEditFormVisible(false);
		const res = await onUpdateTodo(todoItem.id, updatedTodo, todoItem.isCompleted);
		if (!res) {
			setTodoItem(snapShot);
		}
	};
	const updateIsCompletedHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const snapShot = { ...todoItem };
		setTodoItem(() => ({
			...snapShot,
			isCompleted: e.target.checked,
		}));
		const res = await onUpdateTodo(todoItem.id, updatedTodo, e.target.checked);
		if (!res) {
			setTodoItem(snapShot);
		}
	};

	return (
		<li className="flex justify-between w-full whitespace-nowrap ">
			<div className="space-x-[1rem] flex items-center w-full">
				<label className="flex space-x-[0.8rem]">
					<input checked={todoItem.isCompleted} onChange={updateIsCompletedHandler} type="checkbox" />
					{!isEditFormVisible && <span>{todoItem.todo}</span>}
				</label>
				{!isEditFormVisible && (
					<>
						<button
							onClick={() => setIsEditFormVisible(true)}
							data-testid="modify-button"
							className=" rounded bg-g6 p-[0.3rem] "
						>
							수정
						</button>
						<button
							onClick={() => onDeleteTodo(todoItem.id)}
							data-testid="delete-button"
							className=" rounded bg-g6 p-[0.3rem] "
						>
							삭제
						</button>
					</>
				)}
				{isEditFormVisible && (
					<form onSubmit={updateTodoHandler} className="flex items-center w-full space-x-[1rem]">
						<input
							value={updatedTodo}
							onChange={(e) => setUpdatedTodo(e.target.value)}
							data-testid="modify-input"
							type="text"
							enterKeyHint="done"
							autoComplete="off"
							autoCapitalize="off"
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus
							className="input-common "
						/>
						<button type="submit" data-testid="submit-button" className="rounded bg-g6 p-[0.3rem] text-primary">
							제출
						</button>
						<button
							type="button"
							onClick={() => setIsEditFormVisible(false)}
							data-testid="cancel-button"
							className="rounded bg-g6 p-[0.3rem] text-secondary"
						>
							취소
						</button>
					</form>
				)}
			</div>
		</li>
	);
}
