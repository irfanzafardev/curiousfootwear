import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

import Null from "../loading/Null";
import "./search.css";

const Search = () => {
	const query = useLocation().search;
	const path = useLocation().search.substring(query.indexOf("=") + 1);

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/post";

	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const { data } = await axios.get(rootAPI + `/search${query}`);
			setPosts(data);
		};
		fetchPosts();
	}, [query]);
	return (
		<section className="search">
			<div className="container-fluid">
				<div className="heading">
					<h1>Search for "{path}"</h1>
				</div>
				{/* {posts.map((post) => (
					<div key={post._id}>
						<Link to={`post/${post.id}`} className="link">
							<div className="btn btn-outline-dark">{post.title}</div>
						</Link>
					</div>
				))} */}
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

export default Search;
