import React from "react";
import { FaBars } from "react-icons/fa";
import { MdNotificationsActive, MdLogout } from "react-icons/md";
// import Logo from "./logo192.png";

export default function Navbar(props) {
	const { isDrawerOpen, func } = props;
	const logOut = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("tkn");
		localStorage.removeItem("loc_id");
		localStorage.removeItem("role");
		window.location.assign("/");
		console.log("logged out");
	};
	return (
		<>
			<nav>
				<div className="d-nav-flex">
					<ul>
						<li>
							<p className="app-name">GHOST APP</p>
						</li>
						<li>
							<FaBars
								size={25}
								color="var(--darkBlue)"
								style={{ marginRight: 18 }}
								className="FaBars-display"
								onClick={() => func(!isDrawerOpen)}
							/>
						</li>
					</ul>
					<ul className="d-nav-inline-flex">
						<li>
							<MdNotificationsActive size={30} color="var(--darkBlue)" />
						</li>
						<li>
							<MdLogout
								size={30}
								onClick={() => logOut()}
								color="var(--darkBlue)"
							/>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
