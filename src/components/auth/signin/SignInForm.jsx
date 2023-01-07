import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../../services/auth/authSlice";
import Spinner from "../../loading/Spinner";
import "./signinform.css";

const SignInForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const { username, password } = formData;

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
										New user?
										<Link to="/signup" className="link">
											<span> </span> Create an account
										</Link>
									</p>
								</div>
								<form onSubmit={handleSubmit}>
									<div className="input-group">
										<input type="text" id="username" name="username" value={username} onChange={handleChange} autoFocus></input>
										<label>Username</label>
									</div>
									<div className="input-group">
										<input type="password" id="password" name="password" value={password} onChange={handleChange}></input>
										<label>Password</label>
									</div>
									<div className="item-btn float-end">
										<button type="submit" className="btn btn-primary">
											Sign in
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

export default SignInForm;
