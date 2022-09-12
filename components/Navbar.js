import React from "react";
import { UserAddOutlined } from "@ant-design/icons/lib/icons";

export default function Navbar() {
	return (
		<nav className="navbar navbar-dark bg-dark mb-6">
			<div className="container">
				<a className="navbar-brand" href="/">
				<UserAddOutlined  className="me-2" />
					Crud users
				</a>
				<span style={{ color: "white" }}>
					By: Alejandro Alfonso &copy; - FullStack Developer
				</span>
			</div>
		</nav>
	);
}
