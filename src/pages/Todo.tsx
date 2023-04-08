import client from 'app.modules/api/client';
import { ITodo } from 'app.modules/types/todo';
import React, { useEffect, useState } from 'react';

interface Props {
	todo: ITodo;
	onDeleteTodo: (id: ITodo['id']) => Promise<void>;
	onUpdateTodo: (id: ITodo['id'], todo: ITodo['todo'], isCompleted: ITodo['isCompleted']) => Promise<boolean>;
}
function TodoItem({ todo, onUpdateTodo, onDeleteTodo }: Props) {
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

function Todo() {
	const [newTodo, setNewTodo] = useState<string>('');
	const [todos, setTodos] = useState<ITodo[]>([]);
	const getTodosHandler = async () => {
		try {
			const { data } = await client.get('/todos');
			setTodos(data);
		} catch (error) {
			console.error(error);
		}
	};
	const addNewTodoHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodo.trim()) return;
		try {
			const response = await client.post('/todos', {
				todo: newTodo,
			});
			setNewTodo('');
			getTodosHandler();
		} catch (error) {
			getTodosHandler();
			console.error(error);
		}
	};

	const deleteTodoHandler = async (id: ITodo['id']): Promise<void> => {
		try {
			const res = await client.delete(`/todos/${id}`);
			console.log(res);
			let temp = [...todos];
			temp = temp.filter((item) => item.id !== id);
			setTodos(temp);
		} catch (error) {
			console.error(error);
		}
	};
	const updateTodoHandler = async (
		id: ITodo['id'],
		todo: ITodo['todo'],
		isCompleted: ITodo['isCompleted']
	): Promise<boolean> => {
		try {
			const res = await client.put(`/todos/${id}`, {
				todo,
				isCompleted,
			});
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	useEffect(() => {
		getTodosHandler();
	}, []);
	return (
		<div>
			<form onSubmit={addNewTodoHandler}>
				<input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} data-testid="new-todo-input" />
				<button type="submit" data-testid="new-todo-add-button">
					추가
				</button>
			</form>
			<ul>
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} onDeleteTodo={deleteTodoHandler} onUpdateTodo={updateTodoHandler} />
				))}
			</ul>
		</div>
	);
}

export default Todo;
