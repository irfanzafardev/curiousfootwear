import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import SinglePost from "../../components/post/SinglePost";

const SinglePostPage = () => {
	return (
		<div>
			<Navbar />
			<SinglePost />
			<Footer />
		</div>
	);
};

export default SinglePostPage;
