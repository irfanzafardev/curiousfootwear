import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
import "./dailyfeedback.css";
import FeedbackCard from "./FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import MiniSpinner from "../loading/MiniSpinner";
import { getAllComment } from "../../services/comment/commentSlice";
import { reset } from "../../services/post/postSlice";
import { getCurrentUser } from "../../services/user/userSlice";

const DailyFeedback = () => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { comments, isLoading, isError, message } = useSelector((state) => state.comment);

	useEffect(() => {
		if (user) {
			dispatch(getCurrentUser(user?.userId));
		}
		if (isError) {
			console.log(message);
		}
		dispatch(getAllComment());
		return () => {
			dispatch(reset());
		};
	}, [isError, message, dispatch, user, user?.userId]);
	if (isLoading) {
		return (
			<section className="daily-feedback">
				<div className="container-fluid">
					<div className="heading">
						<h1>Newest feedbacks</h1>
					</div>
					<div className="row mt-4">
						<MiniSpinner />
					</div>
				</div>
			</section>
		);
	}
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			paritialVisibilityGutter: 60,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
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
					<h1>Newest feedbacks</h1>
				</div>
				<div className="row mt-4">
					<Carousel responsive={responsive}>
						{comments.slice(0, 6).map((comment) => (
							<FeedbackCard comment={comment} key={comment.id} />
						))}
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default DailyFeedback;
