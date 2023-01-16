import React, { useEffect } from "react";
import PostCard from "./PostCard";
import MiniSpinner from "../loading/MiniSpinner";
import Null from "../loading/Null";
import CategorySlider from "../category/CategorySlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, reset } from "../../services/post/postSlice";
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
						<h1>Featured posts</h1>
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
				<div className="row">{posts.length > 0 ? posts.map((post) => <PostCard key={post.id} post={post} />) : <Null />}</div>
			</div>
		</section>
	);
};

export default FeaturedPost;
