const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require('../middleware/auth');

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();

    return res.status(201).send({
      user,
      token
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOption = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOption) {
    return res.status(400).send({
      error: "Invalid Updates!"
    });
  }

  try {
    const user = req.user;

    updates.forEach(update => user[update] = req.body[update]);

    await user.save({
      validateBeforeSave: true
    });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {

  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});

const avatarUpload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000
  }
});

router.post("/users/me/avatar", avatarUpload.single('avatar'), async (req, res) => {
  res.send();
});

module.exports = router;