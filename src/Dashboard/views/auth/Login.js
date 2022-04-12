import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "react-bootstrap";

function Login(props) {
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("input field must be an email")
			.required("Email is Required"),
		password: Yup.string()
			.min(6, "character too short, should be 6 and above")
			.required("password  is Required"),
	});

	const initialValues = {
		email: "",
		password: "",
	};

	const renderError = (message) => <p className="text-danger">{message}</p>;

	const handleSubmit = async (values) => {
		try {
			console.log(values.password);
			const res = await axios({
				method: "post",
				url: `http://localhost:8080/api/auth/login`,
				headers: {
					"Content-Type": "application/json",
				},
				data: values,
			});

			console.log(res);

			localStorage.setItem("loc_id", res.data?.user?.role?.location?._id);
			localStorage.setItem("tkn", res.data?.token);
			localStorage.setItem("user", JSON.stringify(res.data?.user));
			navigate("/admin/branch");

			// navigate("/admin/branch");
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
	};

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);
					resetForm();
				}}
			>
				<Form>
					<div className="container  ">
						<div className="center-center-login">
							<h3> Admin LogIn</h3>
							<div className="container">
								<div className="ro">
									<p className="text-danger p-2">{error}</p>
									<div className=" col-md-4 col-sm-12 mx-auto">
										<Field
											type="email"
											className="form-control"
											placeholder="email"
											name="email"
											autoComplete="true"
										/>
										<p className="eg-text">
											<span className="required">*</span> Example:
											netuser@gmail.com
										</p>
										<ErrorMessage name="email" render={renderError} />
									</div>
									<div className=" mx-auto col-md-4 col-sm-12">
										<Field
											type="password"
											className="form-control"
											placeholder="password"
											name="password"
										/>
										<p className="eg-text">
											<span className="required">*</span>
										</p>
										<ErrorMessage name="password" render={renderError} />
									</div>
									<div className="col-md-4 col-sm-12 mx-auto">
										<Button
											type="submit"
											className="form-control"
											variant="success"
										>
											Submit
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	);
}

export default Login;
