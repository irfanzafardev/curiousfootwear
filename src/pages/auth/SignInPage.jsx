import React from "react";
import SignInForm from "../../components/auth/signin/SignInForm";
import Footer from "../../components/footer/Footer";
import SignInNavbar from "../../components/navbar/SignInNavbar";

const SignInPage = () => {
	return (
		<div>
			<SignInNavbar />
			<SignInForm />
			<Footer />
		</div>
	);
};

export default SignInPage;
