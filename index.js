const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Create a todo

app.post("/todos", async (req, res) => {
	try {
		const { text } = req.body;
		const addTodo = await pool.query(
			"INSERT INTO ptodo (text) VALUES ($1) RETURNING *",
			[text]
		);
		res.json(addTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Get all todos

app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM ptodo");
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Get a todo

app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const oneTodo = await pool.query("SELECT * FROM ptodo WHERE _id = $1", [
			id,
		]);
		res.json(oneTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Edit a todo

app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { text } = req.body;
		const updateTodo = await pool.query(
			"UPDATE ptodo SET text = $1 WHERE _id = $2",
			[text, id]
		);
		res.json("Update the todo!");
	} catch (err) {
		console.error(err.message);
	}
});

// Delete a todo

app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletTodo = await pool.query("DELETE FROM ptodo WHERE _id = $1", [
			id,
		]);
		res.json("todo deleted!");
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(5000, () => {
	console.log("server has started on port 5000");
});
