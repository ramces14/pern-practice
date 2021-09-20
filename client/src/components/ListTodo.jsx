import React, { useState, useEffect } from "react";

import EditTodo from "./EditTodo";

function ListTodos() {
	const [todos, setTodos] = useState([]);

	console.log(todos);

	// Delete todo function

	const deleteTodo = async (id) => {
		try {
			const deleteTodo = await fetch(`/todos/${id}`, {
				method: "DELETE",
			});
			setTodos(todos.filter((todo) => todo._id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

	const getTodos = async () => {
		try {
			const response = await fetch("/todos");
			const jsonData = await response.json();
			setTodos(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<table className="table mt-5 text-center">
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => {
						return (
							<tr key={todo._id}>
								<td>{todo.text}</td>
								<td>
									<EditTodo todo={todo} />
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => deleteTodo(todo._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ListTodos;
