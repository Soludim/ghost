import React from "react";
import { Routes, Route } from "react-router-dom";
import DashLayout from "./DashLayout";
import BranchTable from "./views/employees/BranchTable";
import NationalTable from "./views/employees/NationalTable";
import Login from "./views/auth/Login";
import Notfound from "./views/employees/NotFound";

import RequireAuth from "./authService/RequireAuth";

export default function MainRoutes(props) {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route element={<RequireAuth />}>
					<Route path="/admin" element={<DashLayout />}>
						<Route path="branch" element={<BranchTable />} />

						<Route path="requested-salary" element={<NationalTable />} />
					</Route>
					<Route path="*" element={<Notfound />} />
				</Route>
			</Routes>
		</>
	);
}
