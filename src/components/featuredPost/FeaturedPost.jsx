import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MiniSpinner from "../loading/MiniSpinner";
import Null from "../loading/Null";
import CategorySlider from "../category/CategorySlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, reset } from "../../services/post/postSlice";
import { AiFillEye } from "react-icons/ai";
import "./explorepost.css";

const FeaturedPost = () => {
	const dispatch = useDispatch();
	const { posts, isLoading, isError, message } = useSelector((state) => state.post);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		dispatch(getAllPost());
		return () => {
			dispatch(reset());
		};

		// fetchPostsById();
	}, [isError, message, dispatch]);
	if (isLoading) {
		return (
			<section className="explore-post">
				<div className="container-fluid">
					<div className="heading">
						<h1>What's new</h1>
					</div>
					<div className="mt-5">
						<MiniSpinner />
					</div>
				</div>
			</section>
		);
	}
	return (
		<section className="explore-post mb-5">
			<div className="container-fluid">
				<div className="heading">
					<h1>Featured Posts</h1>
				</div>
				<div className="category-slider">
					<CategorySlider />
				</div>
				<div className="row">
					{posts.length > 0 ? (
						posts.map((post) => (
							<div className="col-12 col-lg-3" key={post.id}>
								<Link to={`post/${post.id}`} style={{ textDecoration: "none" }}>
									<div className="card">
										<div
											className="card-image"
											style={{
												width: "100%",
												height: "216px",
												background: `url(${post.image})`,
												backgroundSize: "cover",
												objectFit: "cover",
												borderRadius: "10px",
											}}
										>
											<div className="post-detail">
												<p>Post description..</p>
											</div>
										</div>
										{/* <img src={post.image} className="card-img-top" alt="product" /> */}
										<div className="card-body">
											<h2 className="post-title">{post.title}</h2>
											<div className="price row">
												<div className="col-8">
													<p className="post-category">{post.category}</p>
												</div>
												<div className="col-4">
													<div className="post-view">
														<AiFillEye />
														<span>{post?.view}</span>
													</div>
												</div>
												{/* <div className="col-4">
													<span>{kFormatter(post.suggested_price)}</span>
												</div> */}
											</div>
										</div>
									</div>
								</Link>
							</div>
						))
					) : (
						<Null />
					)}
				</div>
			</div>
		</section>
	);
};

export default FeaturedPost;
