const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");



const app = express();

const mongo_url = process.env.MONGO_URL;
const port = process.env.port;

mongoose
    .connect(mongo_url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to mongo database");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



app.listen(port || 4000, () => {
    console.log("Express server started at port: " + port);
});
