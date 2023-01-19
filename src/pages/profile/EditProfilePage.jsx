import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import EditProfile from "../../components/profile/EditProfile";

const EditProfilePage = () => {
	return (
		<div>
			<Navbar />
			<EditProfile />
			<Footer />
		</div>
	);
};

export default EditProfilePage;
