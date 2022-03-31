import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSignal, FaHome } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
const SideBarItems = [
	{
		name: "Branch",
		href: "/admin/branch",
		icon: <FaSignal size={20} color="var(--mainWhite)" />,
	},
	{
		name: "National",
		href: "/admin/national",
		icon: <FaHome size={20} color="var(--mainWhite)" />,
	},
];

function Sidebar(props) {
	// const authService = new AuthService();
	const [user, setUser] = useState();
	// const y = new Date();
	// const url = `${process.env.REACT_APP_API_URL}/images/users`;
	// const id = localStorage.getItem("dumb");
	// const jwt = localStorage.getItem("jwt");
	useEffect(() => {
		// if (id && jwt) {
		// 	const fetchUser = async () => {
		// 		try {
		// 			const res = await authService.getUser(id);
		// 			setUser(res.data.user);
		// 		} catch (err) {
		// 			console.log(err);
		// 		}
		// 	};
		// 	!user && fetchUser();
		// } else {
		// 	window.location.assign("/admin/login");
		// }
	});
	return (
		<>
			<div className="main-sidebar">
				<div className="sidebar-columns">
					<div className="dash-user">
						{user && user.image ? (
							<img
								// src={`${url}/${user.image}`}
								className="img-fluid"
								style={{ width: 60, height: 60, borderRadius: "50%" }}
								alt="..."
							/>
						) : (
							<img
								// src={`${url}/profile_pic.jpg`}
								className="img-fluid"
								style={{ width: 90, height: 90, borderRadius: "50%" }}
								alt="..."
							/>
						)}
						<p className="profile_name">
							{user && user.username}
							<br /> {user && user.role}
						</p>
						{/* <p>{user && user.role}</p> */}
						<div className="divider" />
					</div>
					{SideBarItems.map((item) => {
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
					})}
				</div>
				<div className="sidebar-bottom">
					<MdSettings size={50} color={"var(--mainWhite)"} />
				</div>
			</div>
		</>
	);
}
export default Sidebar;
