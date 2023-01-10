import React, { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import AllComment from "./AllComment";
import MiniSpinner from "../loading/MiniSpinner";

import "./comments.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCommentByPostId } from "../../services/comment/commentSlice";

const Comments = ({ user, postId }) => {
	const [comments, setComments] = useState([]);
	const dispatch = useDispatch();

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";
	useEffect(() => {
		const fetchComments = async () => {
			const commentRes = await axios.get(rootAPI + `comment/getCommentsByPostId/${postId}`);
			dispatch(getAllCommentByPostId(postId)).then(() => {
				setComments(commentRes.data);
			});
		};
		fetchComments();
	}, [postId, dispatch]);
	return (
		<>
			<section className="comments">
				<div className="container-fluid">
					<div className="heading">
						<h1>Feedback</h1>
					</div>
					{comments ? (
						<>
							<CreateComment user={user} postId={postId} setComments={setComments} />
							<AllComment comments={comments} />
						</>
					) : (
						<div className="comment-spinner-container">
							<MiniSpinner />
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Comments;
