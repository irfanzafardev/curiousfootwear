// import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../services/comment/commentSlice";
import "./createcomment.css";

const CreateComment = ({ user, postId, setComments }) => {
	// Create new comment
	const [inputs, setInputs] = useState(0);
	const dispatch = useDispatch();
	// const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prev) => {
			return { ...prev, [name]: value, postId: postId, createdAt: new Date().toLocaleString() + "" };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createComment(inputs)).then(() => {
			window.location.reload();
		});
		// dispatch(createComment(inputs)).then(() => {
		// 	const commentRes = axios.get(rootAPI + `comment/getCommentsByPostId/${postId}`).then(() => {
		// 		setComments(commentRes.data);
		// 	});
		// });
	};
	return (
		<>
			{user ? (
				<div className="comment-form">
					<div className="user-profile">
						<img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />
					</div>
					<div className="form-input">
						<p>
							{user.first_name} {user.last_name}
						</p>
						<input type="text" placeholder="Add a feedback..." name="body" onChange={handleChange} />
						<input type="number" className="currency" placeholder="Suggest a value..." name="suggestedPrice" onChange={handleChange} />
						<button type="submit" className="btn btn-outline-dark" onClick={handleSubmit}>
							Send
						</button>
					</div>
				</div>
			) : (
				<div className="message">
					<h2>Please log in to give your feedback.</h2>
				</div>
			)}
		</>
	);
};

export default CreateComment;
