import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function BranchTable(props) {
	const navigate = useNavigate();
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const res = await axios({
					method: "get",
					url: `http://localhost:8080/api/request-salary`,
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(res);
				setEmployees(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		if (employees.length === 0) {
			fetchEmployees();
		}
	});

	return (
		<>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Location</th>
							<th>Salary</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{employees &&
							employees.map((item, i) => (
								<tr key={item._id}>
									<td>{i + 1}</td>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.location}</td>
									<td>{item.salary}</td>

									<td className="text-center">
										{item.status ? (
											<FaCheckDouble size={25} />
										) : (
											<Button variant="success">Request Salary</Button>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}
