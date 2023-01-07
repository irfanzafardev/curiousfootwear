import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../../services/auth/authSlice";
import Spinner from "../../loading/Spinner";

import "./signupform.css";

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		phone_number: "",
		about: "",
		password: "",
		confirmPassword: "",
	});

	const { first_name, last_name, email, username, phone_number, about, password, confirmPassword } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { currentUser, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			alert(message);
		}

		if (isSuccess || currentUser) {
			window.location.reload();
			navigate("/");
		}

		dispatch(reset());
	}, [currentUser, isError, isSuccess, message, navigate, dispatch]);

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const hanldeSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Salah password");
		} else {
			const userData = {
				first_name,
				last_name,
				email,
				username,
				phone_number,
				about,
				password,
			};

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="signup">
				<div className="container-fluid">
					<div className="row signup-row">
						<div className="col-6 d-none d-lg-flex welcome-column">
							<div className="heading">
								<h1>
									Footware <span className="divider"></span> <span className="text"> The Curious Footwear</span>
								</h1>
							</div>
						</div>
						<div className="col-12 col-lg-6 signup-column">
							<div className="signup-form">
								<div className="heading">
									<h2>Sign up</h2>
									<p>
										Already have account?
										<Link to="/signin" className="link">
											<span> </span> Sign in
										</Link>
									</p>
								</div>
								<form onSubmit={hanldeSubmit}>
									<div className="row name-row">
										<div className="col-6">
											<div className="input-group">
												<input type="text" id="firstName" name="first_name" value={first_name} onChange={handleChange}></input>
												<label>First name</label>
											</div>
										</div>
										<div className="col-6">
											<div className="input-group">
												<input type="text" id="lastName" name="last_name" value={last_name} onChange={handleChange}></input>
												<label>Last name</label>
											</div>
										</div>
									</div>
									<div className="input-group">
										<input type="text" id="email" name="email" value={email} onChange={handleChange}></input>
										<label>Email</label>
									</div>
									<div className="input-group">
										<input type="text" id="username" name="username" value={username} onChange={handleChange}></input>
										<label>Username</label>
									</div>
									<div className="input-group">
										<input type="password" id="password" name="password" value={password} onChange={handleChange}></input>
										<label>Password</label>
									</div>
									<div className="input-group">
										<input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange}></input>
										<label>Confirm Password</label>
									</div>
									<div className="item-btn float-end">
										<button type="submit" className="btn btn-primary">
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignUpForm;
