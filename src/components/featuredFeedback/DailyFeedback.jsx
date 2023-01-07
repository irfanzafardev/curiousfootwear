import React from "react";
import "./dailyfeedback.css";

const DailyFeedback = () => {
	return (
		<section className="daily-feedback">
			<div className="container-fluid">
				<div className="heading">
					<h1>Today's feedback</h1>
				</div>
				<div className="row mt-4">
					<div className="col-12 col-lg-3">
						<div className="card">
							<div className="dark-layer"></div>
							<div className="message">
								<p>Coming soon..</p>
							</div>
							<div className="card-body">
								<div className="product-name">Shoe A</div>
								<div className="comment-wrapper">
									<div className="comment-body">Lorem ipsum dolor sir amet.</div>
									<div className="comment-info">
										<div className="user-info">
											<img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="profile" />
											<div>
												<div className="user-firstname">Username</div>
												<div className="created-at">a moment ago</div>
											</div>
										</div>
										<div className="like-info">1 like</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DailyFeedback;
