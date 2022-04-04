const mongoose = require('mongoose');

//mongoose.set('useCreateIndex', true);

const requested_salary_schema = mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    status: { type: Number, default: 0 }, //0=pending 1=paid -1=rejected 2=notrequested
});
requested_salary_schema.index({ "employee": 1, "month": 1, "year": 1 }, { unique: true })
let requested_salary_model = mongoose.model("requested_salary", requested_salary_schema);


module.exports = requested_salary_model;