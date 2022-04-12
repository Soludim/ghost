import React, { useEffect, useState } from "react";
import { FaTimes, FaSignal, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const SideBarItems = [
	{
		name: "Branch",
		href: "branch",
		icon: <FaSignal size={20} color="var(--mainWhite)" />,
	},
	{
		name: "National",
		href: "national",
		icon: <FaHome size={20} color="var(--mainWhite)" />,
	},
];

export default function Drawer(props) {
	const { setDrawer, isDrawerOpen } = props;
	const [user, setUser] = useState();
	// const [role, setRole] = useState();

	useEffect(() => {
		const current_user = localStorage.getItem("user");
		setUser(JSON.parse(current_user));
	}, []);
	console.log(user);
	return (
		<>
			<div className="main-drawer">
				<FaTimes
					onClick={() => setDrawer(!isDrawerOpen)}
					style={{ marginLeft: 12 }}
					size={35}
					color="var(--mainWhite)"
				/>

				<div className="drawer-columns">
					<div className="dash-user">
						{user ? (
							<div className="user-circle">
								<p>{user.username.split("")[0]}</p>
							</div>
						) : (
							""
						)}
						<h6>Francis Kumi</h6>
						<p>Maintainer</p>
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
				<div className="sidebar-bottom">
					<h6>next page</h6>
				</div>
			</div>
		</>
	);
}
