import client from 'app.modules/api/client';
import { ITodo } from 'app.modules/types/todo';
import React, { useEffect, useState } from 'react';

interface Props {
	todo: ITodo;
	onCheckTodo: (todo: ITodo) => void;
	onDeleteTodo: (id: ITodo['id']) => void;
}
function TodoItem({ todo, onCheckTodo, onDeleteTodo }: Props) {
	const { id, isCompleted, todo: content } = todo;
	return (
		<li key={id}>
			<label>
				<input defaultChecked={isCompleted} onChange={() => onCheckTodo(todo)} type="checkbox" />
				<span>{content}</span>
			</label>
			<input data-testid="modify-input" />
			<button data-testid="modify-button">수정</button>
			<button onClick={() => onDeleteTodo(id)} data-testid="delete-button">
				삭제
			</button>
			<button data-testid="submit-button">제출</button>
			<button data-testid="cancel-button">취소</button>
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
			setTodos(temp); //optimistic ui구현
		} catch (error) {
			getTodosHandler();
			console.error(error);
		}
	};
	console.log(todos);
	const checkTodoHandler = async (todo: ITodo): Promise<void> => {
		const { id, isCompleted } = todo;
		try {
			const res = await client.put(`/todos/${id}`, {
				todo,
				isCompleted,
			});
			console.log(res);
		} catch (error) {
			getTodosHandler();
			console.error(error);
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
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} onCheckTodo={checkTodoHandler} onDeleteTodo={deleteTodoHandler} />
			))}
		</div>
	);
}

export default Todo;
