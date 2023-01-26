import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, reset } from "../../services/post/postSlice";
import axios from "axios";

import PostCard from "./PostCard";
import MiniSpinner from "../loading/MiniSpinner";
import Null from "../loading/Null";
// import CategorySlider from "../category/CategorySlider";
// import InfiniteScroll from "react-infinite-scroll-component";
import FollowingPostCard from "./FollowingPostCard";
import "./explorepost.css";

const FeaturedPost = () => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { posts, isLoading, isError, message } = useSelector((state) => state.post);
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";
	const [followingPosts, setFollowingPosts] = useState("");
	// const [dataSource, setDataSource] = useState(Array.from({ length: 20 }));
	// const [hasMore, setHasMore] = useState(true);

	// const fetchMoreData = () => {
	// 	//Api call
	// 	setTimeout(() => {
	// 		if (dataSource.length < 200) {
	// 			setDataSource(dataSource.concat(Array.from({ length: 20 })));
	// 		} else {
	// 			setHasMore(false);
	// 		}
	// 	}, 3000);
	// };

	useEffect(() => {
		if (currentUser) {
			const fetchFollowingPost = async () => {
				try {
					const postRes = await axios.get(rootAPI + `post/following/${currentUser._id}`);
					setFollowingPosts(postRes.data);
				} catch (error) {
					console.log(error);
				}
			};
			fetchFollowingPost();
		}
		if (isError) {
			console.log(message);
		}
		dispatch(getAllPost());
		return () => {
			dispatch(reset());
		};
	}, [isError, message, dispatch, currentUser, currentUser._id]);

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
		<>
			<section className="explore-post mb-5">
				<div className="container-fluid">
					<div className="heading">
						<h1>Featured posts</h1>
					</div>
					{/* <InfiniteScroll dataLength={dataSource.length} next={fetchMoreData} hasMore={hasMore} loader={<p className="loading-infinite">Loading...</p>} endMessage={<p>No more data to load</p>}>
						{dataSource.map((item, index) => {
							return (
								<div key={index} className="wraper">
									<p>data : #{index + 1}</p>
								</div>
							);
						})}
					</InfiniteScroll> */}
					{/* <div className="row">{posts.length > 0 ? posts.map((post) => <PostCard key={post.id} post={post} />) : <Null />}</div> */}
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
							All
						</button>
						<button className="nav-link" id="nav-bookmark-tab" data-bs-toggle="tab" data-bs-target="#nav-bookmark" type="button" role="tab" aria-controls="nav-bookmark" aria-selected="false">
							My Following
						</button>
					</div>
					<div className="tab-content" id="nav-tabContent">
						<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
							<div className="row">{posts.length > 0 ? posts.map((post) => <PostCard key={post.id} post={post} />) : <Null />}</div>
						</div>
						<div className="tab-pane fade" id="nav-bookmark" role="tabpanel" aria-labelledby="nav-bookmark-tab">
							{currentUser ? (
								<div className="row">{followingPosts.length > 0 ? followingPosts.map((followingPost) => <FollowingPostCard key={followingPost._id} followingPost={followingPost} />) : <Null />}</div>
							) : (
								<div className="message">
									<p>
										Please{" "}
										<Link to="/signin" className="link">
											<span>sign in</span>{" "}
										</Link>
										to see your following posts.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default FeaturedPost;
