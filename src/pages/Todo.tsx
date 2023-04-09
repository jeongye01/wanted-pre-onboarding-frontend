import TodoItem from 'app.features/todo/components/TodoItem';
import client from 'app.modules/api/client';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { ITodo } from 'app.modules/types/todo';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo() {
	const navigate = useNavigate();
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
			console.error(error);
		}
	};

	const deleteTodoHandler = async (id: ITodo['id']): Promise<void> => {
		const snapShot = [...todos];
		try {
			const temp = snapShot.filter((item) => item.id !== id);
			setTodos(temp); // optimistic ui
			const res = await client.delete(`/todos/${id}`);
			console.log(res);
		} catch (error) {
			setTodos(snapShot);
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
		if (!localStorage.getItem('ACCESS_TOKEN')) {
			navigate(SERVICE_URL.signIn);
		}
		getTodosHandler();
	}, []);
	return (
		<div className="h-screen max-w-[50rem] mx-auto px-[2rem] bg-w">
			<main className=" whitespace-nowrap text-subhead2 space-y-[1.6rem] py-[2.4rem] w-full">
				<form onSubmit={addNewTodoHandler} className="flex space-x-[1rem]">
					<input
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						data-testid="new-todo-input"
						className="input-common"
					/>
					<button type="submit" data-testid="new-todo-add-button" className="shadow rounded bg-g6 p-[0.5rem]">
						추가
					</button>
				</form>
				<ul className=" space-y-[1.6rem]  ">
					{todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} onDeleteTodo={deleteTodoHandler} onUpdateTodo={updateTodoHandler} />
					))}
				</ul>
			</main>
		</div>
	);
}

export default Todo;
