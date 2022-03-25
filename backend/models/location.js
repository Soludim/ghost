const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: { type: String, required: true },
});
let locationModel = mongoose.model("Location", locationSchema);
locationModel.exists({ name: "Ashanti" }).then(result => {
    if (!result) {
        locationModel.insertMany([
            { name: "Ashanti" },
            { name: "National" }
        ]).then({}).catch((e) => { console.log(e) });
    }
})

module.exports = locationModel;