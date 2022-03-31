import React from "react";
import { Routes, Route } from "react-router-dom";
import DashLayout from "./DashLayout";
import BranchTable from "./views/employees/BranchTable";
import NationalTable from "./views/employees/NationalTable";

export default function MainRoutes(props) {
	return (
		<>
			<Routes>
				<Route path="/admin" element={<DashLayout />}>
					<Route path="branch" element={<BranchTable />} />
					<Route path="national" element={<NationalTable />} />
				</Route>
			</Routes>
		</>
	);
}
