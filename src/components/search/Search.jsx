import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
				{posts.map((post) => (
					<div key={post._id}>
						<Link to={`post/${post.id}`} className="link">
							<div className="btn btn-outline-dark">{post.title}</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
};

export default Search;
