const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require('./models/location')
require('./models/role')
require('./models/admin')
require('./models/employee')
require('./models/nat_emp_table')

const employeeRoutes = require('./routes/employee');
const rsRoutes = require('./routes/request_salary');
const authRoutes = require('./routes/admin');

const app = express();

const mongo_url = process.env.MONGO_URL;
const port = process.env.port;

mongoose
    .connect(mongo_url, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to mongo database");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use('/api/employee', employeeRoutes);
app.use('/api/request-salary', rsRoutes);
app.use('/api/auth', authRoutes);

app.listen(port || 4000, () => {
    console.log("Express server started at port: " + port);
});
