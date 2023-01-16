import React from "react";
import { Link } from "react-router-dom";

const SignInNavbar = () => {
	return (
		<nav className="row align-items-center fixed-top">
			<div className="container-fluid">
				<Link to="/" className="link">
					<div className="nav-brand">
						<p>FOOTWARE</p>
					</div>
				</Link>
				<div className="nav-items d-flex">
					<div className="item d-none">
						<Link to="/signup" className="link">
							<button type="button" className="btn">
								Sign up
							</button>
						</Link>
					</div>
					<div className="item">
						<Link to="/signup" className="link">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default SignInNavbar;
