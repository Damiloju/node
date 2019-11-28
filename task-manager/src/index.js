const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {

    try {
        const user = await new User(req.body);

        await user.save();

        return res.status(201).send(user);
    } catch (err) {
        return res.status(400).send(err);
    }

});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error)

    }

});


app.post("/tasks", async (req, res) => {
    try {
        const task = await new Task(req.body);
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }

});
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)

    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});