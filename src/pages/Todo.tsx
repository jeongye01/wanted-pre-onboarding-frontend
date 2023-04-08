import client from 'app.modules/api/client';
import React, { useState } from 'react';

function Todo() {
	const [newTodo, setNewTodo] = useState<string>('');
	const addNewTodoHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodo.trim()) return;
		try {
			const response = await client.post('/todos', {
				todo: newTodo,
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<form onSubmit={addNewTodoHandler}>
				<input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} data-testid="new-todo-input" />
				<button type="submit" data-testid="new-todo-add-button">
					추가
				</button>
			</form>
			<li>
				<label>
					<input type="checkbox" />
					<span>TODO 1</span>
				</label>
				<input data-testid="modify-input" />
				<button data-testid="submit-button">제출</button>
				<button data-testid="cancel-button">취소</button>
			</li>
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
