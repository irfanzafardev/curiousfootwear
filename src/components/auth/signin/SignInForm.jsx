import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/auth/authSlice";
import Spinner from "../../loading/Spinner";
import "./signinform.css";

const SignInForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	// console.log(formData);

	const { username, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { currentUser, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (isSuccess || currentUser) {
			console.log("signin succes");
			navigate("/");
			window.location.reload();
		}

		// dispatch(reset());
	}, [currentUser, isError, isSuccess, message, navigate, dispatch]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			username,
			password,
		};
		dispatch(login(userData));
	};
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="login">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6 d-none d-lg-flex welcome-column">
							<div className="heading">
								<h1>
									Footware <span className="divider"></span> <span className="text"> The Curious Footwear</span>
								</h1>
							</div>
						</div>
						<div className="col-12 col-lg-6 login-column">
							<div className="login-form">
								<div className="heading">
									<h2>Sign in</h2>
									<p>
										Don't have an account?
										<Link to="/signup" className="link">
											<span> </span> Sign up here.
										</Link>
									</p>
								</div>
								<form onSubmit={handleSubmit}>
									<div className="input-group">
										<input type="text" id="username" name="username" onChange={handleChange} required></input>
										<label>Username</label>
									</div>
									<div className="input-group">
										<input type="password" id="password" name="password" onChange={handleChange} required></input>
										<label>Password</label>
										<span>{message.toString()}</span>
									</div>
									<div className="item-btn">
										<button type="submit" className="btn btn-dark">
											Sign in
										</button>
									</div>
								</form>
								<p className="back-to-home">
									Back to
									<Link to="/" className="link">
										{" "}
										Home
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignInForm;
