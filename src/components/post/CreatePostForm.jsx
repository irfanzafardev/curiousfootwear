import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/post/postSlice";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import "./createpostform.css";

const CreatePostForm = ({ setOpen }) => {
	const { user } = useSelector((state) => state.auth);
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api";

	// Create new post
	const [inputs, setInputs] = useState(0);
	const [img, setImg] = useState(undefined);
	const [imgPerc, setImgPerc] = useState(0);

	const dispatch = useDispatch();
	// const navigate = useNavigate();

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
			console.log(inputs);
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
		<section className="upload">
			<div className="wrapper">
				<div className="close" onClick={() => setOpen(false)}>
					<AiOutlineClose />
				</div>
				<div className="heading">
					<h1>What footwear do you want to share?</h1>
				</div>
				<form>
					<div className="input-group">
						<input type="text" name="title" onChange={handleChange}></input>
						<label>Product name</label>
					</div>
					<div className="input-group">
						<input type="text" name="brand" onChange={handleChange}></input>
						<label>Product brand</label>
					</div>
					<div className="input-group">
						{imgPerc ? "Uploading: " + imgPerc + "%" : ""}
						<input type="file" className="upload-image" id="fileInput" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
						<label>Product image</label>
					</div>
					<div className="input-group">
						<textarea type="text" name="description" onChange={handleChange}></textarea>
						<label>Product description</label>
					</div>
					<div className="input-group">
						<input type="date" name="purchase_date" onChange={handleChange}></input>
						<label>Product purchase date</label>
					</div>
					<div className="row price-row">
						<div className="col-6">
							<div className="input-group">
								<input type="text" name="original_price" onChange={handleChange}></input>
								<label>Original price</label>
							</div>
						</div>
						<div className="col-6">
							<div className="input-group">
								<input type="text" name="price" onChange={handleChange}></input>
								<label>Initial price</label>
							</div>
						</div>
						<div className="col-6">
							<div className="input-group">
								<input type="text" name="suggested_price" onChange={handleChange}></input>
								<label>Suggested price</label>
							</div>
						</div>
					</div>
					<div className="input-group">
						<input type="text" name="condition" onChange={handleChange}></input>
						<label>Product condition</label>
					</div>
					<div className="input-group">
						<select className="form-select" name="category" onChange={handleChange} required>
							<option>Select Category</option>
							{categories.map((item) => (
								<option key={item.categoryId} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<button className="btn btn-primary" onClick={handleSubmit}>
						Publish
					</button>
				</form>
			</div>
		</section>
	);
};

export default CreatePostForm;
