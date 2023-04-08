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
		const res = await onUpdateTodo(id, updatedTodo, isCompleted);
		if (!res) {
			setContent(todoText);
		}
		setIsVisible(false);
	};
	return (
		<li>
			<label>
				<input
					defaultChecked={isCompleted}
					onChange={(e) => onUpdateTodo(id, content, e.target.checked)}
					type="checkbox"
				/>
				<span>{content}</span>
			</label>

			<button onClick={() => setIsVisible(true)} data-testid="modify-button">
				수정
			</button>
			<button onClick={() => onDeleteTodo(id)} data-testid="delete-button">
				삭제
			</button>
			{isVisible && (
				<form onSubmit={updateTodoContentHandler}>
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
					/>
					<button type="submit" data-testid="submit-button">
						제출
					</button>
					<button type="button" onClick={() => setIsVisible(false)} data-testid="cancel-button">
						취소
					</button>
				</form>
			)}
		</li>
	);
}
