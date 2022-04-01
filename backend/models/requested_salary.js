const mongoose = require('mongoose');

const requested_salary_schema = mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: Number, required: true },
    year: { type: String, required: true },
    status: { type: Number, default: 0 }, //0=pending 1=paid -1=rejected 2=notrequested
});
let requested_salary_model = mongoose.model("requested_salary", requested_salary_schema);


module.exports = requested_salary_model;