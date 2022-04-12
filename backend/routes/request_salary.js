const express = require("express");
const {
	requestSalary,
	getRequestedSalaries,
	getLocalEmployeePaymentRequestStatus,
	getAllEmployeePaymentRequestStatus,
} = require("../controllers/requested_salary");

const router = express.Router();

router.post("/list", getRequestedSalaries);
router.post("/:location", getLocalEmployeePaymentRequestStatus);
router.get("/", getAllEmployeePaymentRequestStatus);
router.post("/", requestSalary);

module.exports = router;
