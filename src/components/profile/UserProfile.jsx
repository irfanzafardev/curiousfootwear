import React from "react";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../services/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./userprofile.css";

const UserProfile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
		window.location.reload();
	};
	return (
		<section className="user-profile">
			<div className="container-fluid">
				<div className="heading">
					<h1>Profile</h1>
				</div>
				<button type="button" className="btn" onClick={handleLogout}>
					Log out
				</button>
			</div>
		</section>
	);
};

export default UserProfile;
