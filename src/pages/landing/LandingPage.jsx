import React from "react";
import DailyFeedback from "../../components/featuredFeedback/DailyFeedback";
import FeaturedPost from "../../components/featuredPost/FeaturedPost";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const LandingPage = () => {
	return (
		<>
			<Navbar />
			<DailyFeedback />
			<FeaturedPost />
			<Footer />
		</>
	);
};

export default LandingPage;
