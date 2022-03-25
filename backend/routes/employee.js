const express = require('express');
const { getEmployees, getEmployeesLocal } = require('../controllers/employee');

const router = express.Router();

router.get('/', getEmployees)  //get all employees
router.get('/:location_id/emp-local', getEmployeesLocal)  //get employees in a particular local


module.exports = router;