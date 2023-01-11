import React from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useSelector } from "react-redux";

import "./allcomment.css";
import Comment from "./Comment";

const AllComment = ({ comments }) => {
	// const { user } = useSelector((state) => state.auth);
	// const { posts } = useSelector((state) => state.post);

	// useEffect(() => {
	// 	dispatch(getCommentById(comments.));
	// }, [postId, dispatch]);

	return (
		<>
			{comments?.length > 0 ? (
				<div>
					{comments.map((comment) => (
						<Comment comment={comment} key={comment.id} />
					))}
				</div>
			) : (
				<div className="message">
					<p>Be the the first one to give feedback!</p>
				</div>
			)}
		</>
	);
};

export default AllComment;
