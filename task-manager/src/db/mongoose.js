const mongoose = require("mongoose");
const validator = require("validator");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const User = mongoose.model("User", {
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  }
});

const bolanle = new User({
  name: "Bolanle",
  email: "example@mail.com",
  age: 45
});

bolanle
  .save()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("Error!", err);
  });

const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const finishPlus = new Task({
  description: "We have to finish t-plus my dear",
  completed: false
});

finishPlus
  .save()
  .then(res => console.log(res))
  .catch(err => console.log(err));
