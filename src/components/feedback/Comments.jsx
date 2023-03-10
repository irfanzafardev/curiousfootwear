import React, { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import AllComment from "./AllComment";
import MiniSpinner from "../loading/MiniSpinner";

import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCommentByPostId } from "../../services/comment/commentSlice";
import "./comments.css";

const Comments = ({ user, postId, setOpen, open }) => {
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
			<section className="comments mb-5">
				<div className="container-fluid">
					<div className="heading">
						<h1>Feedback</h1>
					</div>
					{comments ? (
						<>
							{open && <CreateComment setOpen={setOpen} user={user} postId={postId} />}
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
