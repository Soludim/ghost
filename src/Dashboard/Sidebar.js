import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSignal, FaHome } from "react-icons/fa";
const SideBarItems = [
	{
		name: "Request Salary",
		href: "/admin/branch",
		icon: <FaSignal size={20} color="var(--mainWhite)" />,
	},
	{
		name: "Requested Salary",
		href: "/admin/requested-salary",
		icon: <FaHome size={20} color="var(--mainWhite)" />,
	},
];

function Sidebar(props) {
	const [user, setUser] = useState();
	// const [role, setRole] = useState();

	useEffect(() => {
		const current_user = localStorage.getItem("user");
		setUser(JSON.parse(current_user));
	}, []);
	return (
		<>
			<div className="main-sidebar">
				<div className="sidebar-columns">
					<div className="dash-user">
						{user ? (
							<div className="user-circle">
								<p>{user.username.split("")[0]}</p>
							</div>
						) : (
							""
						)}
						<p className="profile_name">
							{user && user.username}
							<br /> {user && user.role?.name}
						</p>
						{/* <p>{user && user.role}</p> */}
						<div className="divider" />
					</div>
					{user?.role?.role_number === 1 ? (
						SideBarItems.map((item) => {
							return (
								<div key={item.name}>
									<NavLink
										to={`${item.href}`}
										className={(navData) =>
											navData.isActive ? "active-sidebar" : ""
										}
									>
										<div className="dash-nav">
											<li className="icon">{item.icon}</li>
											<li className="dash-name">{item.name}</li>
										</div>
									</NavLink>
								</div>
							);
						})
					) : (
						<div key={SideBarItems[0].name}>
							<NavLink
								to={`${SideBarItems[0].href}`}
								className={(navData) =>
									navData.isActive ? "active-sidebar" : ""
								}
							>
								<div className="dash-nav">
									<li className="icon">{SideBarItems[0].icon}</li>
									<li className="dash-name">{SideBarItems[0].name}</li>
								</div>
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
export default Sidebar;
