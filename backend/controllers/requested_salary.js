const requestedSalary = require("../models/requested_salary");
const Employee = require("../models/employee");
//const genToken = require('../services/generate_token');

exports.requestSalary = (req, res) => {
	const rs = new requestedSalary({
		employee: req.body.employee,
		month: req.body.month,
		status: 0, //pending state
		year: req.body.year,
	});

	rs.save()
		.then((savedRs) => {
			res.status(201).json({
				message: "Salary request sent successfully",
				request: savedRs,
			});
		})
		.catch((error) => {
			if (error.name === "ValidationError") {
				return res.status(401).json({
					message: error.message,
				});
			}

			res.status(500).json({
				message: "Something went wrong",
			});
		});
};

exports.getRequestedSalaries = (req, res) => {
	requestedSalary
		.find({ month: req.body.month, year: req.body.year })
		.then((rs) => {
			if (rs) {
				res.status(200).json(rs);
			} else {
				res.status(404).json({ message: "No requested Salary!" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Something went wrong!" });
		});
};

exports.getEmployeePaymentRequestStatus = (req, res) => {
	var array = [];
	Employee.find({ location: req.body.location })
		.populate("location")
		.then(async (employees) => {
			if (employees) {
				var rs = await requestedSalary.find({
					month: req.body.month,
					year: req.body.year,
				});

				for (let i = 0; i < employees.length; i++) {
					let rs1 = rs.some((o) => o.employee === employees[i]._id);
					if (rs1) {
						array[i] = {
							firstName: employees[i].firstName,
							lastName: employees[i].lastName,
							location: employees[i].location.name,
							salary: employees[i].salary,
							status: rs1.status, //not requested
						};
					} else {
						array[i] = {
							firstName: employees[i].firstName,
							lastName: employees[i].lastName,
							location: employees[i].location.name,
							salary: employees[i].salary,
							status: 2, //not requested
						};
					}
				}
				res.status(200).json(array);
			} else {
				res.status(404).json({ message: "No employees Found!" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: "Fetching employees failed!" });
		});
};
