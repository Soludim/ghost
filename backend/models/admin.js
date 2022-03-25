const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
});


let adminModel = mongoose.model("Admin", adminSchema);
adminModel.exists({ username: "James" }).then(result => {
    if (!result) {
        adminModel.insertMany([
            {
                username: "James", email: "james@gmail.com",
                password: "12345678", role: "6239e2c7b53ce6446e0beeeb"
            }, //nat
            {
                username: "Frimpong", email: "frim@gmail.com",
                password: "12345678", role: "6239e2c7b53ce6446e0beeec"
            },  //ash
        ]).then({}).catch((e) => { console.log(e) });
    }
})


module.exports = adminModel;