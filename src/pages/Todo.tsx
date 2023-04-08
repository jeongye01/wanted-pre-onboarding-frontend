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

	const deleteTodoHandler = async (id: ITodo['id']) => {
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
	const checkTodoHandler = async (id: ITodo['id'], todo: ITodo['todo'], isCompleted: ITodo['isCompleted']) => {
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
			{todos.map(({ id, todo, isCompleted }) => (
				<li key={id}>
					<label>
						<input
							defaultChecked={isCompleted}
							onChange={(e) => checkTodoHandler(id, todo, e.target.checked)}
							type="checkbox"
						/>
						<span>{todo}</span>
					</label>
					<input data-testid="modify-input" />
					<button data-testid="modify-button">수정</button>
					<button onClick={() => deleteTodoHandler(id)} data-testid="delete-button">
						삭제
					</button>
					<button data-testid="submit-button">제출</button>
					<button data-testid="cancel-button">취소</button>
				</li>
			))}
			<li>
				<label>
					<input type="checkbox" />
					<span>TODO 2</span>
				</label>
				<input data-testid="modify-input" />
				<button data-testid="submit-button">제출</button>
				<button data-testid="cancel-button">취소</button>
			</li>
		</div>
	);
}

export default Todo;
