import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function NationalTable(props) {
	const navigate = useNavigate();
	const [hostels, setHostels] = useState();

	const employees = [
		{
			id: 3,
			firstName: "Michael",
			lastName: "Narh",
			location: "Kumasi",
			status: false,
			salary: 23889.0,
		},
		{
			id: 4,
			firstName: "Sarah Badu",
			lastName: "Nyamen",
			location: "Kumasi",
			status: true,
			salary: 23889.0,
		},
		{
			id: 2,
			firstName: "Georgina",
			lastName: "Anokyewaa",
			location: "Kumasi",
			status: false,
			salary: 23889.0,
		},
		{
			id: 6,
			firstName: "Stephen",
			lastName: "Saah",
			location: "Kumasi",
			status: true,
			salary: 23889.0,
		},
		{
			id: 7,
			firstName: "Michael",
			lastName: "Narh",
			location: "Kumasi",
			status: true,
			salary: 23889.0,
		},
		{
			id: 8,
			firstName: "Michael",
			lastName: "Narh",
			location: "Kumasi",
			status: false,
			salary: 23889.0,
		},
	];

	useEffect(() => {});

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
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.location}</td>
									<td>{item.salary}</td>

									<td className="text-center">
										{item.status ? (
											<FaCheckDouble size={25} />
										) : (
											<Button variant="success">Pay Salary</Button>
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
