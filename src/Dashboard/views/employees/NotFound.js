import React from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function Notfound(props) {
	return (
		<>
			<div>
				<h2> Page Not Found</h2>
				<Button variant="primary" onClick={Navigate("/")}>
					Back
				</Button>
			</div>
		</>
	);
}
