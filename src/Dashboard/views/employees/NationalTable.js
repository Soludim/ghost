import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { renderError } from "../../utils/Utils";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function NationalTable(props) {
	const alert = useAlert();
	const [employees, setEmployees] = useState([]);
	const [em_month, setEmMonth] = useState([]);
	const [em_year, setYear] = useState([]);
	const [token, setToken] = useState();

	const months = [
		{ key: "January" },
		{ key: "February" },
		{ key: "March" },
		{ key: "April" },
		{ key: "May" },
		{ key: "June" },
		{ key: "July" },
		{ key: "August" },
		{ key: "September" },
		{ key: "October" },
		{ key: "November" },
		{ key: "December" },
	];
	useEffect(() => {
		const token = localStorage.getItem("tkn");
		setToken(token);
	}, []);

	const handleSearch = async (values) => {
		setEmMonth(values.month);
		setYear(values.year);
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8080/api/request-salary/list`,
				headers: {
					"Content-Type": "application/json",
				},
				data: values,
			});
			console.log(res.data);
			setEmployees(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const paySalary = async (id) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8080/api/request-salary/pay/${id}?token=${token}`,
				headers: {
					"Content-Type": "application/json",
				},
			});
			const curr_emp = employees;
			console.log(res.data, employees);
			curr_emp.forEach((el) => {
				if (el.employee._id === res.data?.rs?.employee) {
					el.status = res.data.rs?.status;
				}
			});

			setEmployees([...curr_emp]);
			alert.show("Salary Paid");
		} catch (err) {
			console.log(err);
		}
	};

	const validationSchema = Yup.object({
		month: Yup.string().required("Month is required"),
		year: Yup.string().required("Year is required"),
	});

	const initialValues = {
		month: em_month ?? 0,
		year: em_year ?? 2022,
	};
	return (
		<>
			<div className="table-container">
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						await handleSearch(values);
						resetForm();
					}}
				>
					<Form>
						<div className="row">
							<div className="col-md-5 coll-sm-12">
								<Field
									as="select"
									className="form-select"
									placeholder="Location"
									name="month"
								>
									<option> Select Month</option>
									{months.map((item, i) => (
										<option key={i} value={i + 1}>
											{item.key}
										</option>
									))}
								</Field>

								<ErrorMessage name="month" render={renderError} />
							</div>
							<div className="col-md-5 coll-sm-12">
								<Field
									as="select"
									className="form-select"
									placeholder="Location"
									name="year"
								>
									<option> Select Year</option>
									<option value={2022}> 2022</option>
									<option value={2021}> 2021</option>
									<option value={2020}> 2020</option>
									<option value={2019}> 2019</option>
								</Field>

								<ErrorMessage name="year" render={renderError} />
							</div>
							<div className="col-md-2 col-sm-12">
								<Button type="submit " variant="success">
									Search
								</Button>
							</div>
						</div>
					</Form>
				</Formik>
				<div>
					{employees.length > 0 ? (
						<h3 className="text-center text-success">
							Request Month <span>{em_month}</span> and Year{" "}
							<span>{em_year}</span>{" "}
						</h3>
					) : (
						""
					)}
				</div>
				<table className="mt-4">
					<thead>
						<tr>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Location</th>
							<th>Salary</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{employees.length > 0 &&
							employees.map((item, i) => (
								<tr key={item.employee?._id}>
									<td>{i + 1}</td>
									<td>{item.employee?.firstName}</td>
									<td>{item.employee?.lastName}</td>
									<td>{item.employee?.location?.name}</td>
									<td>{item.employee?.salary}</td>

									<td className="text-center">
										{item.status === 1 ? (
											<Button disabled variant="success">Paid</Button>
										) :
											item.status === -1 ?
												<Button disabled variant="danger">Rejected</Button>
												: (
													<Button
														variant="success"
														onClick={() => paySalary(item._id)}
													>
														Pay Salary
													</Button>
												)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}
