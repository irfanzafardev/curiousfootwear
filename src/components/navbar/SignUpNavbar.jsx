import React from "react";
import { Link } from "react-router-dom";

const SignUpNavbar = () => {
	return (
		<nav className="row align-items-center fixed-top">
			<div className="container-fluid">
				<Link to="/" className="link">
					<div className="nav-brand">
						<p>FOOTWARE</p>
					</div>
				</Link>
				<div className="nav-items d-flex">
					<div className="item-btn">
						<Link to="/signin" className="link">
							<button type="button" className="btn">
								Sign in
							</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default SignUpNavbar;
