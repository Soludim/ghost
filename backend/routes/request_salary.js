const express = require('express');
const { requestSalary, getRequestedSalaries, getEmployeePaymentRequestStatus } = require('../controllers/requested_salary');

const router = express.Router();

router.get('/', getEmployeePaymentRequestStatus)
router.post('/', requestSalary)
router.get('/list', getRequestedSalaries)

module.exports = router;