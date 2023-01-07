import React from "react";
import "./footer.css";

import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
	return (
		<footer>
			<div className="container-fluid">
				<div className="footer-body">
					<p>
						Made with love for LXI-SCC final project.
						<span>
							{" "}
							<a href="https://github.com/irfanzafardev/thecuriousfootwear" rel="noreferrer" target="_blank">
								Github <FiArrowUpRight />
							</a>
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
