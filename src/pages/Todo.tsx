import TodoItem from 'app.features/todo/components/TodoItem';
import client from 'app.modules/api/client';
import { ITodo } from 'app.modules/types/todo';
import React, { useEffect, useState } from 'react';

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
