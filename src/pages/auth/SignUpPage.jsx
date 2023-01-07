import React from "react";
import SignUpForm from "../../components/auth/signup/SignUpForm";
import Footer from "../../components/footer/Footer";
import SignUpNavbar from "../../components/navbar/SignUpNavbar";

const SignUpPage = () => {
	return (
		<div>
			<SignUpNavbar />
			<SignUpForm />
			<Footer />
		</div>
	);
};

export default SignUpPage;
