import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
import "./dailyfeedback.css";
import FeedbackCard from "./FeedbackCard";

const DailyFeedback = () => {
	const [feedbacks, setFeedbacks] = useState([]);

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/comment";
	const fetchFeedbacks = async () => {
		const { data } = await axios.get(rootAPI + "/all");
		setFeedbacks(data);
	};
	useEffect(() => {
		fetchFeedbacks();
	}, []);
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			paritialVisibilityGutter: 60,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 4,
			paritialVisibilityGutter: 50,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			paritialVisibilityGutter: 30,
		},
	};
	return (
		<section className="daily-feedback">
			<div className="container-fluid">
				<div className="heading">
					<h1>Today's feedbacks</h1>
				</div>
				<div className="row mt-4">
					<Carousel responsive={responsive}>
						{feedbacks.slice(0, 10).map((feedback) => (
							<FeedbackCard feedback={feedback} key={feedback.id} />
						))}
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default DailyFeedback;
