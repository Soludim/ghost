const Employee = require('../models/employee');

exports.getEmployee = (req, res) => {
    Employee.findById(req.params.EmployeeId).populate('location')
        .then(employee => {
            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json({ message: "Employee Not Found!" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Fetching data failed!" });
        });
}

exports.getEmployees = (req, res) => {
    Employee.find().populate('location')
        .then(employees => {
            if (employees) {
                res.status(200).json(employees);
            } else {
                res.status(404).json({ message: "No employees Found!" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Fetching employees failed!" });
        });
}

exports.getEmployeesLocal = (req, res) => {
    Employee.find({ location: req.params.location_id }).populate('location')
        .then(employees => {
            if (employees) {
                res.status(200).json(employees);
            } else {
                res.status(404).json({ message: "No employees Found!" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Fetching employees failed!" });
        });
}