import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./feedbackCard.css";

const FeedbackCard = ({ comment }) => {
	const [post, setPost] = useState("");
	const [user, setUser] = useState("");

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";

	useEffect(() => {
		const fetchOwner = async () => {
			try {
				const postRes = await axios.get(rootAPI + `post/${comment.postId}`);
				const userRes = await axios.get(rootAPI + `user/profil/${comment.userId}`);
				setPost(postRes.data);
				setUser(userRes.data[0]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOwner();
	}, [comment.postId, comment.userId]);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};
	return (
		<>
			{post ? (
				<div className="col-12 col-lg-3 feedback-card" key={comment.id}>
					<Link to={`post/${comment.postId}`} style={{ textDecoration: "none" }}>
						<div
							className="card"
							style={{
								width: "320px",
								height: "146px",
								// background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
								background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${post?.image})`,
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center center",
								borderRadius: "12px",
							}}
						>
							<div className="card-body">
								<div className="product-name">{post?.title}</div>
								<div className="comment-wrapper">
									<div className="comment-body">{comment.body}</div>
									<div className="comment-info">
										<div className="user-info">
											<img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="profile" />
											<div>
												<div className="user-firstname">{user?.first_name}</div>
												<div className="created-at">{formatDate(`${comment.createdAt}`)}</div>
											</div>
										</div>
										<div className="like-info">{comment.like.length} like</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			) : (
				<div className="col-12 col-lg-3 feedback-card" key={comment.id}>
					<div className="card">
						<div className="dark-layer"></div>
						<div className="message">
							<p>Post no longer exist</p>
						</div>
						<div className="card-body">
							<div className="product-name">{post?.title}</div>
							<div className="comment-wrapper">
								<div className="comment-body">{comment.body}</div>
								<div className="comment-info">
									<div className="user-info">
										<img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="profile" />
										<div>
											<div className="user-firstname">{user?.first_name}</div>
											<div className="created-at">{formatDate(`${comment.createdAt}`)}</div>
										</div>
									</div>
									<div className="like-info">{comment.like.length} like</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FeedbackCard;
