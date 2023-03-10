import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../services/post/postSlice";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import "./createpostform.css";
import { Link, useNavigate } from "react-router-dom";

const CreatePostForm = ({ setOpen }) => {
	const { user } = useSelector((state) => state.auth);
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api";

	// Create new post
	const [inputs, setInputs] = useState(0);
	const [img, setImg] = useState(undefined);
	const [imgPerc, setImgPerc] = useState(0);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prev) => {
			return { ...prev, [name]: value, username: user.username, createdAt: new Date().toLocaleString() + "" };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createPost(inputs)).then(() => {
			setOpen(false);
			navigate("/profile/me");
			window.location.reload();
		});
	};

	// Fetch category
	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		const { data } = await axios.get(rootAPI + "/category/all");
		setCategories(data);
	};
	useEffect(() => {
		fetchCategories();
	}, []);
	return (
		<>
			{user ? (
				<section className="upload">
					<div className="wrapper">
						<div className="close" onClick={() => setOpen(false)}>
							<AiOutlineClose />
						</div>
						<div className="heading">
							<h1>Share your footwear</h1>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-6">
									<div className="input-group">
										<input type="text" name="brand" onChange={handleChange} required></input>
										<label>
											Brand <span className="text-danger">*</span>
										</label>
									</div>
								</div>
								<div className="col-6">
									<div className="input-group">
										<input type="text" name="title" onChange={handleChange} required></input>
										<label>
											Name <span className="text-danger">*</span>
										</label>
									</div>
								</div>
							</div>
							<div className="input-group">
								{imgPerc ? <div className="upload-precentage">Uploading: {imgPerc} %</div> : ""}
								<input type="file" className="upload-image" id="fileInput" accept="image/*" onChange={(e) => setImg(e.target.files[0])} required />
								<label>
									Image <span className="text-danger">*</span>
								</label>
							</div>
							<div className="row">
								<div className="col-6">
									<div className="input-group">
										<input type="date" name="purchase_date" onChange={handleChange} required></input>
										<label>
											Purchase date <span className="text-danger">*</span>
										</label>
									</div>
								</div>
								<div className="col-6">
									<div className="input-group">
										<select className="form-select mt-2" name="category" onChange={handleChange} required>
											<option>Select Category</option>
											{categories.map((item) => (
												<option key={item.categoryId} value={item.name}>
													{item.name}
												</option>
											))}
										</select>
										<label>
											Category <span className="text-danger">*</span>
										</label>
									</div>
								</div>
							</div>
							<div className="row price-row">
								<div className="col-6">
									<div className="input-group">
										<input type="number" name="original_price" placeholder="The price of this shoes when you bought them" onChange={handleChange} required></input>
										<label>
											Original price <span className="text-danger">*</span>
										</label>
									</div>
								</div>
								<div className="col-6">
									<div className="input-group">
										<input type="number" name="price" placeholder="Set your own price of this shoes" onChange={handleChange} required></input>
										<label>
											Initial price <span className="text-danger">*</span>
										</label>
									</div>
								</div>
							</div>
							<div className="input-group">
								<textarea type="text" name="description" onChange={handleChange}></textarea>
								<label>
									Description <span className="text-danger">*</span>
								</label>
							</div>
							<div className="button-group">
								<button className="btn btn-outline-dark" onClick={() => setOpen(false)}>
									Discard
								</button>
								<button type="submit" className="btn btn-dark">
									Create post
								</button>
							</div>
						</form>
						<div className="mobile-message">
							<p>Please visit this site on desktop browser to give your feedback.</p>
						</div>
					</div>
				</section>
			) : (
				<section className="upload">
					<div className="wrapper">
						<div className="close" onClick={() => setOpen(false)}>
							<AiOutlineClose />
						</div>
						<div className="heading">
							<h1>Share your footwear</h1>
						</div>
						<div className="message">
							<p>
								Please{" "}
								<Link to="/signin" className="link">
									<span>sign in</span>{" "}
								</Link>
								to share your footwear.
							</p>
						</div>
						<div className="mobile-message">
							<p>Please visit this site on desktop browser to upload your footwear.</p>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CreatePostForm;
