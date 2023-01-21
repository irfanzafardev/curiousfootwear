import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../../services/auth/authSlice";
// import { ToastContainer, toast } from "react-toastify";
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

	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (isSuccess) {
			navigate("/signin");
		}

		dispatch(reset());
	}, [isError, isSuccess, message, navigate, dispatch]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Password doesn't match");
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
			console.log(userData);

			dispatch(register(userData));
		}
	};

	const [focusedPhone, setFocusedPhone] = useState(false);
	const [focusedFirstName, setFocusedFirstName] = useState(false);
	const [focusedLastName, setFocusedLastName] = useState(false);
	const [focusedEmail, setFocusedEmail] = useState(false);
	const [focusedUsername, setFocusedUsername] = useState(false);
	const [focusedPassword, setFocusedPassword] = useState(false);
	const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);
	const handleFocusPhone = (e) => {
		setFocusedPhone(true);
	};
	const handleFocusFirstName = (e) => {
		setFocusedFirstName(true);
	};
	const handleFocusLastName = (e) => {
		setFocusedLastName(true);
	};
	const handleFocusEmail = (e) => {
		setFocusedEmail(true);
	};
	const handleFocusUsername = (e) => {
		setFocusedUsername(true);
	};
	const handleFocusPassword = (e) => {
		setFocusedPassword(true);
	};
	const handleFocusConfirmPassword = (e) => {
		setFocusedConfirmPassword(true);
	};

	if (isLoading) {
		return (
			<>
				<Spinner />
				{/* <ToastContainer /> */}
			</>
		);
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
								<form onSubmit={handleSubmit}>
									<div className="row name-row">
										<div className="col-6">
											<div className="input-group">
												<input type="text" id="firstName" name="first_name" pattern="^.{1,}$" onChange={handleChange} onBlur={handleFocusFirstName} focused={focusedFirstName.toString()} required></input>
												<label>First name</label>
												<span>Please fill the field.</span>
											</div>
										</div>
										<div className="col-6">
											<div className="input-group">
												<input type="text" id="lastName" name="last_name" pattern="^.{1,}$" onChange={handleChange} onBlur={handleFocusLastName} focused={focusedLastName.toString()} required></input>
												<label>Last name</label>
												<span>Please fill the field.</span>
											</div>
										</div>
									</div>
									<div className="input-group">
										<input type="email" id="email" name="email" onChange={handleChange} onBlur={handleFocusEmail} focused={focusedEmail.toString()} required></input>
										<label>Email</label>
										<span>should be a valid email address.</span>
									</div>
									<div className="input-group">
										<input type="text" id="username" name="username" pattern="^[A-Za-z0-9]{5,}$" onChange={handleChange} onBlur={handleFocusUsername} focused={focusedUsername.toString()} required></input>
										<label>Username</label>
										<span>Username should be a minimum of 5 characters. Only letters and numbers.</span>
									</div>
									<div className="input-group">
										<input type="text" id="phone_number" name="phone_number" pattern="^[0-9]{10,14}$" onChange={handleChange} onBlur={handleFocusPhone} focused={focusedPhone.toString()} required></input>
										<label>Phone</label>
										<span>Phone number should a minimum of 10 to 14 characters of numbers.</span>
									</div>
									<div className="input-group">
										<input type="password" id="password" name="password" pattern="^.{4,}$" onChange={handleChange} onBlur={handleFocusPassword} focused={focusedPassword.toString()} required></input>
										<label>Password</label>
										<span>Passsword should be a minimum of 4 characters.</span>
									</div>
									<div className="input-group">
										<input type="password" id="confirmPassword" name="confirmPassword" pattern={formData.password} onChange={handleChange} onBlur={handleFocusConfirmPassword} onFocus={() => setFocusedConfirmPassword(true)} focused={focusedConfirmPassword.toString()} required></input>
										<label>Confirm Password</label>
										<span>Passsword doesn't match.</span>
									</div>
									<div className="item-btn">
										<button type="submit" className="btn btn-dark" disabled={false}>
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
