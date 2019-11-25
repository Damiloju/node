const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const bolanle = new User({
    name: "Bolanle",
    age: 45
});

bolanle.save().then(res => {
    console.log(res);
}).catch(err => {
    console.log("Error!", err);
});