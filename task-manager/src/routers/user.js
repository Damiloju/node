const express = require("express");
const multer = require("multer");
const sharp = require('sharp');
const User = require("../models/user");
const auth = require('../middleware/auth');
const {
  sendWelcomeEmail,
  sendCancelEmail
} = require("../emails/account");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body);

    await user.save();
    sendWelcomeEmail(user.email, user.name);
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
    sendCancelEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});

const avatarUpload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

router.post("/users/me/avatar", auth, avatarUpload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({
    width: 250,
    height: 250
  }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (err, req, res, next) => {
  res.status(400).send({
    error: err.message
  });
});

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    res.status(404).send();
  }
});

module.exports = router;