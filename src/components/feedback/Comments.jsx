import React, { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import AllComment from "./AllComment";

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
			<CreateComment user={user} postId={postId} setComments={setComments} />
			<AllComment comments={comments} />
		</>
	);
};

export default Comments;
