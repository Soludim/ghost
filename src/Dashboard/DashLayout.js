import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Drawer from "./Drawer";
import Navbar from "./Navbar";
export default function DashLayout() {
	const [isDrawerOpen, setDrawer] = useState(false);
	return (
		<>
			<div className="container-wrapper">
				<Navbar func={setDrawer} isDrawerOpen={isDrawerOpen} />
				{isDrawerOpen && (
					<Drawer isDrawerOpen={isDrawerOpen} setDrawer={setDrawer} />
				)}
				{!isDrawerOpen && (
					<div className="layout">
						<Sidebar />
						<div className="content p-5">
							<Outlet />
						</div>
					</div>
				)}
			</div>
		</>
	);
}
