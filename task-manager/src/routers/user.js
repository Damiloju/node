const express = require('express');
const User = require('../models/user');

const router = new express.Router();


router.post("/users", async (req, res) => {

    try {
        const user = await new User(req.body);

        await user.save();

        return res.status(201).send(user);
    } catch (err) {
        return res.status(400).send(err);
    }

});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOption = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOption) {
        return res.status(400).send({
            error: "Invalid Updates!"
        });
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;