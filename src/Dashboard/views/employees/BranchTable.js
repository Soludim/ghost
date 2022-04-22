import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import { renderError } from "../../utils/Utils";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function BranchTable(props) {
	const [user, setUser] = useState();
	const alert = useAlert();
	const navigate = useNavigate();
	const [employees, setEmployees] = useState([]);
	const [em_month, setEmMonth] = useState([]);
	const [em_year, setYear] = useState([]);
	const [loc_id, setLocId] = useState();

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
		const current_user = localStorage.getItem("user");
		setUser(JSON.parse(current_user));
		const id = localStorage.getItem("loc_id");
		setLocId(id);
	}, []);

	const handleSearch = async (values) => {
		console.log(values);
		setEmMonth(values.month);
		setYear(values.year);
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8080/api/request-salary/${loc_id}`,
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

	const requestSalary = async (id) => {
		console.log(em_month, em_year);
		const data = {
			employee: id,
			month: em_month,
			year: em_year,
		};
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8080/api/request-salary",
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			});
			const curr_emp = employees;
			curr_emp.forEach((el) => {
				if (el.emp_id === res.data?.request?.employee) {
					el.status = res.data.request?.status;
				}
			});

			alert.show("Request Sent");
			setEmployees([...curr_emp]);
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
				<h3>{user && user.role.location.name} Branch</h3>
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
							<th className="text-center">Status</th>
						</tr>
					</thead>
					<tbody>
						{employees.length > 0 &&
							employees.map((item, i) => (
								<tr key={item._id}>
									<td>{i + 1}</td>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.location}</td>
									<td>{item.salary}</td>

									<td className="text-center">
										{item.status === 2 ? (
											<Button
												onClick={() => requestSalary(item.emp_id)}
												variant="success"
											>
												Request Salary
											</Button>
										) : item.status === 0 ? (
											<Button
												variant="warning"
												onClick={() =>
													alert.show("Your request is being processed", {
														type: "info",
													})
												}
											>
												pending
											</Button>
										) : item.status === -1 ? (
											<Button variant="danger" disabled>Rejected</Button>
										) : (
											<FaCheckDouble size={25} />
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
