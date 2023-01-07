import React from "react";
import { Link } from "react-router-dom";
import "./featuredcomment.css";

const FeaturedComment = () => {
	return (
		<section className="featured-comment mb-5 d-none">
			<div className="container-fluid">
				<div className="heading">
					<h1>Feedbacks</h1>
				</div>
				<div className="row">
					<div className="col-12 col-lg-4">
						<Link to={`post/`} style={{ textDecoration: "none" }}>
							<div className="card">
								<div className="dark-layer"></div>
								<div className="message">
									<p>Coming soon..</p>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-4 product-img-wrapper">
											<img className="product-img" src="https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
										</div>
										<div className="col-8 user-info-wrapper">
											<div className="user-info">
												<img className="user-img" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />
												<div>
													<h5 className="card-title">Username</h5>
													<h6 className="card-subtitle mb-2 text-muted">Feedback on Post A</h6>
												</div>
											</div>
											<p className="card-text">Lorem ipsum dolor sit amet.</p>
											{/* <p className="card-text">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</p> */}
											<div className="card-link">visit page</div>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturedComment;
