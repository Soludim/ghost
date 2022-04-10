import React from "react";
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
						<img
							src="/imgs/profile.jpg"
							className="img-fluid"
							style={{ width: 50, height: 50, borderRadius: "50%" }}
							alt="..."
						/>
						<h6>Francis Kumi</h6>
						<p>Maintainer</p>
						<div className="divider" />
					</div>
					{SideBarItems.map((item) => {
						return (
							<NavLink
								key={item.name}
								to={`${item.href}`}
								className={(navData) =>
									navData.isActive ? "active-sidebar" : ""
								}
								onClick={() => setDrawer(!isDrawerOpen)}
							>
								<div className="dash-nav">
									<li className="icon">{item.icon}</li>
									<li className="dash-name">{item.name}</li>
								</div>
							</NavLink>
						);
					})}
				</div>
				<div className="sidebar-bottom">
					<h6>next page</h6>
				</div>
			</div>
		</>
	);
}
