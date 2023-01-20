import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Comments from "../feedback/Comments";
import MiniSpinner from "../loading/MiniSpinner";

import { AiOutlineHeart, AiFillHeart, AiOutlineMessage, AiOutlinePlus, AiFillInfoCircle } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost, likePost, unlikePost, deletePost, viewPost } from "../../services/post/postSlice";
import "./singlepost.css";
import SuggestedPrice from "./SuggestedPrice";

const SinglePost = () => {
	const path = useLocation().pathname.split("/")[2];
	const [post, setPost] = useState("");
	const [owner, setOwner] = useState("");
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.post);
	const { comments } = useSelector((state) => state.comment);
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";

	useEffect(() => {
		const fetchOwner = async () => {
			try {
				const postRes = await axios.get(rootAPI + "post/" + path);
				const userRes = await axios.get(rootAPI + `user/profil/${postRes.data.userId}`);
				setPost(postRes.data);
				setOwner(userRes.data);
				dispatch(getCurrentPost(postRes.data._id));
				dispatch(viewPost(postRes.data._id));
			} catch (error) {
				console.log(error);
			}
		};

		fetchOwner();
	}, [path, dispatch]);

	// Format date
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	var date = new Date(post.purchase_date);
	const year = date.getFullYear();

	// Like post
	const handleLike = () => {
		dispatch(likePost(post._id));
	};

	// Unlike post
	const handleUnlike = () => {
		dispatch(unlikePost(post._id));
	};

	// Delete post
	const handleDelete = () => {
		dispatch(deletePost(post._id)).then(() => {
			navigate(`/`);
			window.location.reload();
			alert("Post has been deleted");
		});
	};

	return (
		<>
			<section className="single-post">
				{post ? (
					<>
						<div className="sidebar">
							<div className="product-wrapper">
								<div className="product-price">
									<div className="row">
										<div className="col-6 col-divider">
											<div className="initial-price">
												<p>IDR{post.price}</p>
											</div>
											<span className="initial-price">Initial Price</span>
										</div>
										<div className="col-6">
											<SuggestedPrice post={post} />
											<div className="suggested-price">
												Most Suggested Price{" "}
												<span>
													<AiFillInfoCircle />
													<span id="tooltipText">The most suggested price is set from the most liked feedback. You can also give a suggestion by clicking the Give Feedback button below. </span>
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="product-option">
									<a className="btn btn-outline-dark" href={`https://api.whatsapp.com/send?phone=${owner[0].phone_number}`} target="_blank" rel="noreferrer">
										<AiOutlineMessage className="me-1" />
										Contact owner
									</a>
									<button className="btn btn-dark" onClick={() => setOpen(true)}>
										Give Feedback
									</button>
								</div>
								<div className="product-owner">
									<div className="user-profile">
										<div className="user-image">{owner[0].image ? <img src="" alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />}</div>
										<div className="user-info">
											<div>
												<div className="username">
													{owner[0].first_name} {owner[0].last_name}
												</div>
												<div className="created-at">{formatDate(`${post.createdAt}`)}</div>
											</div>
										</div>
									</div>
									<div className="user-option">
										{user ? (
											<button className="btn btn-dark" disabled>
												<AiOutlinePlus />
												Follow
											</button>
										) : (
											""
										)}
									</div>
								</div>
								<div className="product-name">
									<h1>{post.title}</h1>
								</div>
								<div className="product-original-price">
									<p>
										Original price:{" "}
										<span>
											IDR{post.original_price} ({year})
										</span>
									</p>
								</div>
								<div className="product-desc">
									<h2>Description</h2>
									<p>{post.description}</p>
								</div>
							</div>
						</div>
						<div className="main">
							<div className="container-fluid">
								<div className="heading">
									<img src={post.image} alt="product" />
								</div>
								<div className="body">
									<div className="post-detail">
										<div className="like-comment">
											{comments?.length} comments • {posts.like?.length} likes
										</div>
										{user ? (
											<div className="post-option">
												<button className="share-post" disabled>
													<RiShareForwardLine size="1.6em" />
													Share
												</button>
												<button className="comment-post" onClick={() => setOpen(true)}>
													<FaRegComment />
													Comment
												</button>

												{posts.like?.includes(user?.userId.toString()) ? (
													<button className="like-post" onClick={handleUnlike}>
														<AiFillHeart size="1.4em" />
														Like
													</button>
												) : (
													<button className="like-post" onClick={handleLike}>
														<AiOutlineHeart size="1.4em" />
														Like
													</button>
												)}
												<div className="dropdown">
													<div className="other-option dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
														<BsThreeDots />
													</div>
													<ul className="dropdown-menu">
														<li>
															{user.userId?.toString() === posts.userId ? (
																<button className="dropdown-item" onClick={handleDelete}>
																	Delete post
																</button>
															) : (
																<button className="dropdown-item" onClick={handleDelete} disabled>
																	Delete post
																</button>
															)}

															<button className="dropdown-item" disabled>
																Save to bookmark
															</button>
														</li>
													</ul>
												</div>
											</div>
										) : (
											<div className="message">
												<p>
													Please
													<Link to="/signin" className="link">
														{" "}
														<span>sign in</span>
													</Link>{" "}
													to like or give feedback.
												</p>
											</div>
										)}
										<div className="mobile-display">
											<div className="product-wrapper">
												<div className="product-price">
													<div className="row">
														<div className="col-6 col-divider">
															<div className="initial-price">
																<p>IDR{post.price}</p>
															</div>
															<span className="initial-price">Initial Price</span>
														</div>
														<div className="col-6">
															<SuggestedPrice post={post} />
															<div className="suggested-price">
																Most Suggested Price{" "}
																<span>
																	<AiFillInfoCircle />
																	<span id="tooltipText">The most suggested price is set from the most liked feedback. You can also give a suggestion by clicking the Give Feedback button below. </span>
																</span>
															</div>
														</div>
													</div>
												</div>
												<div className="product-option">
													<button className="btn btn-outline-dark" disabled>
														<AiOutlineMessage className="me-1" />
														Contact owner
													</button>
													<button className="btn btn-dark" onClick={() => setOpen(true)}>
														Give Feedback
													</button>
												</div>
												<div className="product-owner">
													<div className="user-profile">
														<div className="user-image">{owner[0].image ? <img src="" alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />}</div>
														<div className="user-info">
															<div>
																<div className="username">
																	{owner[0].first_name} {owner[0].last_name}
																</div>
																{/* <div className="created-at">{moment(`${post.createdAt}`, "YYYYMMDD").fromNow()}</div> */}
																<div className="created-at">{formatDate(`${post.createdAt}`)}</div>
															</div>
														</div>
													</div>
													<div className="user-option">
														{user ? (
															<button className="btn btn-dark" disabled>
																<AiOutlinePlus />
																Follow
															</button>
														) : (
															""
														)}
													</div>
												</div>
												<div className="product-name">
													<h1>{post.title}</h1>
												</div>
												<div className="product-original-price">
													<p>
														Original price:{" "}
														<span>
															IDR{post.original_price} ({year})
														</span>
													</p>
												</div>
												<div className="product-desc">
													<h2>Description</h2>
													<p>{post.description}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<Comments postId={post._id} user={user} setOpen={setOpen} open={open} />
						</div>
					</>
				) : (
					<div className="spinner-container">
						<MiniSpinner />
					</div>
				)}
			</section>
		</>
	);
};

export default SinglePost;
