import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

export default function BranchTable(props) {
	const navigate = useNavigate();
	const [employees, setEmployees] = useState([]);
	const [em_month, setEmMonth] = useState([]);
	const [em_year, setYear] = useState([]);

	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	useEffect(() => {});

	const handleSearch = async (values) => {
		console.log(values);
		setEmMonth(values.month);
		setYear(values.year);
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8080/api/request-salary/6239e27119dda0238c905d92",
				headers: {
					"Content-Type": "application/json",
				},
				data: values,
			});
			// console.log(res);
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
		console.log(data);
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8080/api/request-salary",
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			});
			// console.log(res);
			console.log(res.data);
			setEmployees(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const initialValues = {
		month: 1,
		year: 2022,
	};

	return (
		<>
			<div className="table-container">
				<Formik
					enableReinitialize={true}
					initialValues={initialValues}
					// validationSchema={validationSchema}
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
									{months.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</Field>
								<p className="eg-text">
									{" "}
									{/* <span className="required">*</span> Example: Ayeduase */}
								</p>
								{/* <ErrorMessage name="location" render={renderError} /> */}
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
									<option value={2020}> 2021</option>
									<option value={2019}> 2019</option>
								</Field>
								<p className="eg-text">
									{" "}
									{/* <span className="required">*</span> Example: Ayeduase */}
								</p>
								{/* <ErrorMessage name="location" render={renderError} /> */}
							</div>
							<div className="col-md-2 col-sm-12">
								<Button type="submit " variant="success">
									Search
								</Button>
							</div>
						</div>
					</Form>
				</Formik>

				<table>
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
						{employees &&
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
											<Button variant="success">pending</Button>
										) : item.status === -1 ? (
											<Button variant="success">Rejected</Button>
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
