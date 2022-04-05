const express = require("express");
const {
	requestSalary,
	getRequestedSalaries,
	getLocalEmployeePaymentRequestStatus,
	getAllEmployeePaymentRequestStatus,
} = require("../controllers/requested_salary");

const router = express.Router();

<<<<<<< HEAD
router.post('/:location', getLocalEmployeePaymentRequestStatus)
router.get('/list', getRequestedSalaries)
router.get('/', getAllEmployeePaymentRequestStatus)
router.post('/', requestSalary)
=======
router.post("/:location", getLocalEmployeePaymentRequestStatus);
router.get("/list", getRequestedSalaries);
router.get("/", getAllEmployeePaymentRequestStatus);
router.post("/", requestSalary);
>>>>>>> 1253aed54f00039d808e0a18f42707960499aaa2

module.exports = router;
