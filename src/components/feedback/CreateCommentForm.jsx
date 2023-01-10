// import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";

import { createComment } from "../../services/comment/commentSlice";
import "./createcommentform.css";
import { Link } from "react-router-dom";

const CreateCommentForm = ({ user, postId, setOpen }) => {
	// Create new comment
	const [inputs, setInputs] = useState(0);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prev) => {
			return { ...prev, [name]: value, postId: postId, createdAt: new Date().toLocaleString() + "" };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createComment(inputs)).then(() => {
			// window.location.reload();
			console.log(inputs);
		});
	};
	return (
		<>
			{user ? (
				<section className="create-comment">
					<div className="comment-form">
						<div className="heading">
							<h1>Give feedback</h1>
							<div className="close" onClick={() => setOpen(false)}>
								<AiOutlineClose />
							</div>
						</div>
						<div className="form-input">
							<p>
								{user.first_name} {user.last_name}
							</p>
							<div className="set-price">
								<div className="label">
									<h2>Price</h2>
									<span>Suggest a fair price for the shoes</span>
								</div>
								<input type="number" className="currency" placeholder="Suggest a value..." name="suggestedPrice" onChange={handleChange} />
							</div>
							<div className="set-feedback">
								<div className="label">
									<h2>Feedback</h2>
									<span>Tell the author your reasons</span>
								</div>
								<textarea type="text" placeholder="Add a feedback..." name="body" onChange={handleChange} />
							</div>
							<button type="submit" className="btn btn-dark" onClick={handleSubmit}>
								<AiOutlineSend />
								Send
							</button>
						</div>
					</div>
				</section>
			) : (
				<section className="create-comment">
					<div className="comment-form">
						<div className="heading">
							<h1>Give feedback</h1>
							<div className="close" onClick={() => setOpen(false)}>
								<AiOutlineClose />
							</div>
						</div>
						<div className="message">
							<p>
								Please{" "}
								<Link to="/signin" className="link">
									<span>sign in</span>{" "}
								</Link>
								to like or give feedback.
							</p>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CreateCommentForm;
