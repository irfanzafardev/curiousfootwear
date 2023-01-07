import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import UserProfile from "../../components/profile/UserProfile";

const ProfilePage = () => {
	return (
		<div>
			<Navbar />
			<UserProfile />
			<Footer />
		</div>
	);
};

export default ProfilePage;
