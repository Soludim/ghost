const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
	salary: { type: Number, required: true },
});

let employeeModel = mongoose.model("Employee", employeeSchema);
employeeModel.exists({ firstName: "James" }).then((result) => {
	if (!result) {
		employeeModel
			.insertMany([
				{
					firstName: "James",
					lastName: "Bekoe",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Michael",
					lastName: "Mensah",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Francis",
					lastName: "Rillo",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Asare",
					lastName: "Bediako",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Mary",
					lastName: "Amponsah",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Janet",
					lastName: "Owusu",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "James",
					lastName: "Bekoe",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Michael",
					lastName: "Mensah",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Francis",
					lastName: "Rillo",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Asare",
					lastName: "Bediako",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Mary",
					lastName: "Amponsah",
					location: "6239e27119dda0238c905d92",
					salary: 5000,
				},
				{
					firstName: "Janet",
					lastName: "Owusu",
					location: "6239e27119dda0238c905d93",
					salary: 5000,
				},
				{
					firstName: "Collins",
					lastName: "Bremps",
					location: "6239e27119dda0238c905d93",
					salary: 5000,
				}, //Nat
			])
			.then({})
			.catch((e) => {
				console.log(e);
			});
	}
});

module.exports = employeeModel;
