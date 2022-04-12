import React from "react";
import { Routes, Route } from "react-router-dom";
import DashLayout from "./DashLayout";
import BranchTable from "./views/employees/BranchTable";
import NationalTable from "./views/employees/NationalTable";
import Login from "./views/auth/Login";
import Notfound from "./views/employees/NotFound";

export default function MainRoutes(props) {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />

				<Route path="/admin" element={<DashLayout />}>
					<Route path="branch" element={<BranchTable />} />

					<Route path="national" element={<NationalTable />} />

					<Route path="*" element={<Notfound />} />
				</Route>
			</Routes>
		</>
	);
}
