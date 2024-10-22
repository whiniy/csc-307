import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(
		`Example app listening at http://localhost:${port}`
	);
});

const users = {
	users_list: [
		{
			id: "xyz789",
			name: "Charlie",
			job: "Janitor"
		},
		{
			id: "abc123",
			name: "Mac",
			job: "Bouncer"
		},
		{
			id: "ppp222",
			name: "Mac",
			job: "Professor"
		},
		{
			id: "yat999",
			name: "Dee",
			job: "Aspiring actress"
		},
		{
			id: "zap555",
			name: "Dennis",
			job: "Bartender"
		}

	]
};

const findUserByName = (name) => {
	return users["users_list"].filter(
		(user) => user["name"] === name
	);
};

const findUserById = (id) =>
	users["users_list"].find((user) => user["id"] === id);

const findUserByNameAndJob = (name, job) => {
	return users["users_list"].filter(
		(user) => user["name"] === name && user["job"] === job
	);
};

const addUser = (user) => {
	users["users_list"].push(user);
	return user;
};

const deleteUserById = (id) => {
	const i = users["users_list"].findIndex((user) =>
		user["id"] === id);

	if (i != -1) {
		users["users_list"].splice(i, 1);
		return true;
	} else {
		return false;
	}
};

app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;

	if (name != undefined && job != undefined) {
		let result = findUserByNameAndJob(name, job);
		result = {users_list: result};
		res.send(result);
	} else if (name != undefined) {
		let result = findUserByName(name);
		result = {users_list: result};
		res.send(result);
	} else {
		res.send(users);
	}
});

app.get("/users/:id", (req, res) => {
	const id = req.params["id"];
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	} else {
		res.send(result);
	}
});

app.post("/users", (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	//res.send();
	res.status(201).send({ message: 'User created successfully.', user: userToAdd});
});

app.delete("/users/:id", (req, res) => {
	const id = req.params["id"]
	const isDeleted = deleteUserById(id);
	
	if (isDeleted) {
		res.status(200).send(`User ${id} successfully deleted.`);
	} else {
		res.status(404).send("User not found.");
	}
});


