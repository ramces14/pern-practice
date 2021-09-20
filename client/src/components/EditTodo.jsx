import React, { useState } from "react";

function EditTodo({ todo }) {
	const [text, setText] = useState(todo.text);

	const updateText = async (e) => {
		e.preventDefault();
		try {
			const body = { text };
			const editedTodo = await fetch(`/todos/${todo._id}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(body),
			});
			window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<div className="container">
			<button
				type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#id${todo._id}`}
			>
				Edit
			</button>

			<div className="modal" id={`id${todo._id}`}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Edit Todo</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={() => setText(todo.text)}
							>
								X
							</button>
						</div>

						<div className="modal-body">
							<input
								type="text"
								className="form-control"
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-warning"
								data-dismiss="modal"
								onClick={(e) => updateText(e)}
							>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal"
								onClick={() => setText(todo.text)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditTodo;
