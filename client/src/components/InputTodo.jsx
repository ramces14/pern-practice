import React, { useState } from "react";

function InputTodo() {
	const [text, setText] = useState("");

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { text };
			const response = await fetch("/todos", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(body),
			});
			window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<div className="container-sm">
			<h1 className="text-center mt-5">Pern Todo List</h1>
			<form className="d-flex mt-5" onSubmit={onSubmitForm}>
				<input
					type="text"
					className="form-control"
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<button className="btn btn-success">Add</button>
			</form>
		</div>
	);
}

export default InputTodo;
