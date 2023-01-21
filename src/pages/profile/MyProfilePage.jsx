import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import UserProfile from "../../components/profile/UserProfile";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyProfilePage = () => {
	// const notify = () => toast.success("login");

	return (
		<div>
			<Navbar />
			<UserProfile />
			{/* <ToastContainer /> */}
			<Footer />
		</div>
	);
};

export default MyProfilePage;
