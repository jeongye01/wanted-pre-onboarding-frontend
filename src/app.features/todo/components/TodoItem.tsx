import { ITodo } from 'app.modules/types/todo';
import React, { useState } from 'react';

interface Props {
	todo: ITodo;
	onDeleteTodo: (id: ITodo['id']) => Promise<void>;
	onUpdateTodo: (id: ITodo['id'], todo: ITodo['todo'], isCompleted: ITodo['isCompleted']) => Promise<boolean>;
}
export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo }: Props) {
	const { id, isCompleted, todo: todoText } = todo;
	const [content, setContent] = useState<string>(todoText); // for optimistic ui
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [updatedTodo, setUpdatedTodo] = useState<string>(content);
	const updateTodoContentHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		setContent(updatedTodo);
		setIsVisible(false);
		const res = await onUpdateTodo(id, updatedTodo, isCompleted);
		if (!res) {
			setContent(todoText);
		}
	};
	return (
		<li className="flex justify-between w-full whitespace-nowrap ">
			<div className="space-x-[1rem] flex items-center w-full">
				<label className="flex space-x-[0.8rem]">
					<input
						defaultChecked={isCompleted}
						onChange={(e) => onUpdateTodo(id, content, e.target.checked)}
						type="checkbox"
					/>
					{!isVisible && <span>{content}</span>}
				</label>
				{!isVisible && (
					<>
						<button
							onClick={() => setIsVisible(true)}
							data-testid="modify-button"
							className=" rounded bg-g6 p-[0.3rem] "
						>
							수정
						</button>
						<button onClick={() => onDeleteTodo(id)} data-testid="delete-button" className=" rounded bg-g6 p-[0.3rem] ">
							삭제
						</button>
					</>
				)}
				{isVisible && (
					<form onSubmit={updateTodoContentHandler} className="flex items-center w-full space-x-[1rem]">
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
							onClick={() => setIsVisible(false)}
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
