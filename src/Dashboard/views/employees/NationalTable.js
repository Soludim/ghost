import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { renderError } from "../../utils/Utils";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function NationalTable(props) {
	const alert = useAlert();
	const navigate = useNavigate();
	const [employees, setEmployees] = useState([]);
	const [em_month, setEmMonth] = useState([]);
	const [em_year, setYear] = useState([]);
	const [loc_id, setLocId] = useState();

	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	useEffect(() => {
		const id = localStorage.getItem("loc_id");
		setLocId(id);
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
		console.log(em_month, em_year);
		const data = {
			employee: id,
			month: em_month,
			year: em_year,
			status: 1,
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
									{months.map((item) => (
										<option key={item} value={item}>
											{item}
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
									<option value={2023}> 2023</option>
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
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.location}</td>
									<td>{item.salary}</td>

									<td className="text-center">
										{item.status === 1 ? (
											<Button variant="danger">Paid</Button>
										) : (
											<Button
												variant="success"
												onClick={() => paySalary(item.employee)}
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
