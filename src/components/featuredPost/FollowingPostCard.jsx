import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import "./postcard.css";
import axios from "axios";
import { useDispatch } from "react-redux";

const FollowingPostCard = ({ followingPost }) => {
	const [user, setUer] = useState("");
	const dispatch = useDispatch();

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";

	useEffect(() => {
		const fetchOwner = async () => {
			try {
				const userRes = await axios.get(rootAPI + `user/profil/${followingPost.userId}`);
				setUer(userRes.data[0]);
				// console.log(post.userId);
			} catch (error) {
				console.log(error.mesage);
			}
		};

		fetchOwner();
	}, [followingPost?.userId, dispatch]);

	const [mostLikedComments, setMostLikedComments] = useState([]);

	useEffect(() => {
		const fetchMostLikedComments = async (postId) => {
			const commentResp = await axios.get(rootAPI + `comment/getCommentsByMostLiked/${postId}`);
			setMostLikedComments(commentResp.data);
		};
		fetchMostLikedComments(followingPost.id);
	}, [followingPost?.id]);
	return (
		<div className="col-12 col-lg-3" key={followingPost._id}>
			<Link to={`post/${followingPost?._id}`} style={{ textDecoration: "none" }}>
				<div className="card">
					<div
						className="card-image"
						style={{
							width: "100%",
							height: "216px",
							background: `url(${followingPost.image})`,
							backgroundSize: "cover",
							objectFit: "cover",
							borderRadius: "10px",
						}}
					>
						<div className="post-detail">
							<div className="user-detail">
								<img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="profile" />
								<div>
									<div className="user-firstname">{user.first_name}</div>
								</div>
							</div>
							<div className="button-wrapper">
								<button className="btn btn-light">Give a feedback</button>
							</div>
							<div className="price-detail">
								<div>
									<div className="label">Initial price</div>
									<div className="value">IDR{followingPost.price}</div>
								</div>
								<div>
									<div className="label">Most suggested price</div>
									<div className="value">{mostLikedComments ? <p>IDR{mostLikedComments[0]?.suggestedPrice || "-"}</p> : <p>-</p>}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<h2 className="post-title">{followingPost.title}</h2>
						<div className="price row">
							<div className="col-8">
								<p className="post-category">{followingPost.category}</p>
							</div>
							<div className="col-4">
								<div className="post-view">
									<AiFillEye />
									<span>{followingPost?.view}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default FollowingPostCard;
