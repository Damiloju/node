const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post("/tasks", async (req, res) => {
    try {
        const task = await new Task(req.body);
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }

});
router.get('/tasks/:id', async (req, res) => {
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


router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOption = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOption) {
        return res.status(400).send({
            error: "Invalid Updates!"
        });
    }

    try {
        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);

        await task.save({
            validateBeforeSave: true
        });


        res.send(task);
    } catch (error) {
        res.status(400).send({
            error
        });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;