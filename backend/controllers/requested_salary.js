const requestedSalary = require("../models/requested_salary");
const Employee = require("../models/employee");
const Nat_Emp_Table = require("../models/nat_emp_table");
//const genToken = require('../services/generate_token');

exports.requestSalary = (req, res) => {
	const rs = new requestedSalary({
		employee: req.body.employee,
		month: req.body.month,
		status: 0, //pending state
		year: req.body.year,
	});

	rs.save()
		.then(async (savedRs) => {
			let rejected = await rejectEmployeeSalaryRequest(savedRs);
			console.log(rejected);
			if (rejected) {
				savedRs.status = -1;
			}

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
				message: error.message,
			});
		});
};

async function rejectEmployeeSalaryRequest(rs) {
	//reject employee salary request if not present in national employee table
	var employeeExistInNational;
	let doc = await Nat_Emp_Table.find();
	employeeExistInNational = doc.some(
		(o) => o.employee.toString() === rs.employee.toString()
	);
	if (!employeeExistInNational)
		await requestedSalary.updateOne({ _id: rs._id }, { status: -1 });

	return !employeeExistInNational;
}

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

exports.getLocalEmployeePaymentRequestStatus = (req, res) => {
	console.log(req.body);
	var array = [];
	if (req.body.month === undefined || req.body.month === null) {
		return res.status(401).json({ message: "Month is required" });
	}
	if (req.body.year === undefined || req.body.year === null) {
		return res.status(401).json({ message: "Year is required" });
	}

	Employee.find({ location: req.params.location })
		.populate("location")
		.then(async (employees) => {
			if (employees) {
				var rs = await requestedSalary.find({
					month: req.body.month,
					year: req.body.year,
				});
				for (let i = 0; i < employees.length; i++) {
					let rs1 = rs.findIndex((o) => o.employee === employees[i]._id);
					if (rs1 >= 0) {
						array[i] = {
							emp_id: employees[i]._id,
							firstName: employees[i].firstName,
							lastName: employees[i].lastName,
							location: employees[i].location.name,
							salary: employees[i].salary,
							status: rs[rs1].status, //not requested
						};
					} else if (rs1 === -1) {
						array[i] = {
							emp_id: employees[i]._id,
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

exports.getAllEmployeePaymentRequestStatus = (req, res) => {
	var array = [];
	if (req.body.month === undefined || req.body.month === null) {
		return res.status(401).json({ message: "Month is required" });
	}
	if (req.body.year === undefined || req.body.year === null) {
		return res.status(401).json({ message: "Year is required" });
	}

	Employee.find()
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
