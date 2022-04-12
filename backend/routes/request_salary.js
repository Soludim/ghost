const express = require("express");
const check_auth = require("../middlewares/check-auth");
const {
	requestSalary,
	getRequestedSalaries,
	getLocalEmployeePaymentRequestStatus,
	getAllEmployeePaymentRequestStatus,
	paySalary,
} = require("../controllers/requested_salary");

const router = express.Router();

router.post("/pay/:id", check_auth, paySalary);
router.post("/list", getRequestedSalaries);
router.post("/:location", getLocalEmployeePaymentRequestStatus);
router.get("/", getAllEmployeePaymentRequestStatus);
router.post("/", requestSalary);

module.exports = router;
