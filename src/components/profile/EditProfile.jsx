import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./editProfile.css";

const EditProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [phone, setPhone] = useState("");

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api";

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const { data } = await axios.get(rootAPI + "/user/profil/" + user.userId);
			setFirstName(data[0].first_name);
			setLastName(data[0].last_name);
			setEmail(data[0].email);
			setUsername(data[0].username);
			setPhone(data[0].phone_number);
		};
		fetchCurrentUser();
	}, [user.userId]);

	return (
		<section className="edit-profile">
			<div className="container-fluid">
				<div className="heading">
					<h1>Edit my profile</h1>
				</div>
				<form>
					<div className="input-group">
						{/* {imgPerc ? <div className="upload-precentage">Uploading: {imgPerc} %</div> : ""} */}

						<input type="file" className="upload-image" id="fileInput" accept="image/*" required />
						<label>Image</label>
					</div>
					<div className="row name-row">
						<div className="col-6">
							<div className="input-group">
								<input type="text" id="firstName" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
								<label>First name</label>
							</div>
						</div>
						<div className="col-6">
							<div className="input-group">
								<input type="text" id="lastName" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
								<label>Last name</label>
							</div>
						</div>
					</div>
					<div className="input-group">
						<input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
						<label>Email</label>
					</div>
					<div className="input-group">
						<input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
						<label>Username</label>
					</div>
					<div className="input-group">
						<input type="text" id="phone_number" name="phone_number" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
						<label>Phone</label>
					</div>
					<div className="item-btn">
						<button type="submit" className="btn btn-dark">
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default EditProfile;
