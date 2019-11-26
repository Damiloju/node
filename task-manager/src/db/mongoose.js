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
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate(value) {
      if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password cannot not contain password");
      }
    }
  },
  age: {
    type: Number,
    defualt: 0,
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
  password: "assword",
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
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const finishPlus = new Task({
  description: "We have to finish t-plus my dear"
});

finishPlus
  .save()
  .then(res => console.log(res))
  .catch(err => console.log(err));
