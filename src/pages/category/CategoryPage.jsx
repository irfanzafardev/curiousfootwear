import React from "react";
import PostByCatgeory from "../../components/category/PostByCatgeory";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const CategoryPage = () => {
	return (
		<>
			<Navbar />
			<PostByCatgeory />
			<Footer />
		</>
	);
};

export default CategoryPage;
