import React from "react";
import "./about.css";

const About = () => {
	return (
		<section className="about">
			<div className="container-fluid row pe-0">
				<div className="col-12 col-lg-7">
					<div className="heading">
						<h1>Welcome To The Curious Footwear</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>
				</div>
				<div className="col-12 col-lg-5 p-0">
					<img src="https://images.pexels.com/photos/5214139/pexels-photo-5214139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="header" />
				</div>
			</div>
		</section>
	);
};

export default About;
