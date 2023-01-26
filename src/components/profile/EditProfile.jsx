import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import "./editProfile.css";
// import { editProfile } from "../../services/user/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const [profileImg, setProfileImg] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [phone, setPhone] = useState("");
	const [about, setAbout] = useState("");
	const [inputs, setInputs] = useState(0);

	const [img, setImg] = useState(undefined);
	const [imgPerc, setImgPerc] = useState(0);

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api";

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const { data } = await axios.get(rootAPI + "/user/profil/" + user.userId);
			setProfileImg(data[0].image);
			setFirstName(data[0].first_name);
			setLastName(data[0].last_name);
			setEmail(data[0].email);
			setUsername(data[0].username);
			setPhone(data[0].phone_number);
			setAbout(data[0].about);
		};
		fetchCurrentUser();
	}, [user.userId]);

	const uploadFile = (file, urlType) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setImgPerc(Math.round(progress));
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						break;
				}
			},
			(error) => {},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setInputs((prev) => {
						return { ...prev, [urlType]: downloadURL };
					});
				});
			}
		);
	};

	useEffect(() => {
		img && uploadFile(img, "image");
	}, [img]);

	const handleClick = () => {
		setInputs((prev) => {
			return { ...prev, first_name: firstName, last_name: lastName, email: email, username: username, phone_number: phone, about: about };
		});
	};

	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/user/profil/edit/";
		const editProfile = async () => {
			await axios.put(rootAPI + user.userId, inputs);
		};
		editProfile().then(() => {
			navigate("/profile/me");
			window.location.reload();
		});
		// dispatch(editProfile(user.userId, inputs));
	};
	return (
		<section className="edit-profile">
			<div className="container-fluid">
				<div className="heading">
					<h1>Edit My Profile</h1>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="profile-image">{profileImg ? <img src={profileImg} alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />}</div>
					<div className="input-group">
						{imgPerc ? <div className="upload-precentage">Uploading: {imgPerc} %</div> : ""}
						<input type="file" className="upload-image" id="fileInput" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
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
					<div className="input-group">
						<textarea type="text" id="about" name="about" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
						<label>About</label>
					</div>
					<div className="item-btn">
						<button type="submit" className="btn btn-dark" onClick={handleClick}>
							Update profile
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default EditProfile;
