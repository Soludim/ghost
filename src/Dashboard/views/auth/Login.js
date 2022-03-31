import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { ContextStore } from "../../../store/ContextStore";
// import { AuthService } from "../../../services/AuthService";
// import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Login(props) {
	// const authService = new AuthService();
	// const navigate = useNavigate();
	const [error, setError] = useState("");
	// const { authStore } = useContext(ContextStore);
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
			// const res = await authService.Login(values);
			// authStore.setUser(res.data.user);
			// authStore.setIsLoggedIn(true);
			// localStorage.setItem("dumb", res.data.user._id);
			// navigate("/admin/dashboard");
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
											autoComplete="true"
											aria-label="location"
											name="password"
										/>
										<p className="eg-text">
											<span className="required">*</span>
										</p>
										<ErrorMessage name="password" render={renderError} />
									</div>
									<div className="col-md-4 col-sm-12 mx-auto">
										<button
											type="submit"
											className="btn form-control text-center mt-3"
										>
											Submit
										</button>
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
