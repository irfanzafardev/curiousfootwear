import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "./comment.css";
import { getCommentById, likeComment, unlikeComment } from "../../services/comment/singleCommentSlice";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ comment }) => {
	const [commentLike, setCommentLike] = useState(comment?.like.length);
	const [commentLikeIcon, setCommentLikeIcon] = useState("");
	const [commentLikeIcon2, setCommentLikeIcon2] = useState("d-none");
	const [commentUnlikeIcon, setCommentUnlikeIcon] = useState("");
	const [commentUnlikeIcon2, setCommentUnlikeIcon2] = useState("d-none");

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	// console.log(comment);
	// const { currentComment } = useSelector((state) => state.singlecomment);

	const handleMouseEnter = async () => {
		dispatch(getCommentById(comment.id));
		console.log(comment.likeCount);
	};

	// Like a comment
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLike = async () => {
		dispatch(likeComment(comment.id));
		setCommentLike(comment?.like.length + 1);
		setCommentLikeIcon("d-none");
		setCommentLikeIcon2("d-none");
		setCommentUnlikeIcon2("d-block");
	};

	const handleUnlike = async () => {
		dispatch(unlikeComment(comment.id));
		setCommentLike(comment?.like.length);
		setCommentUnlikeIcon("d-none");
		setCommentUnlikeIcon2("d-none");
		setCommentLikeIcon2("d-block");
	};
	return (
		<div className="comment" onMouseEnter={handleMouseEnter}>
			<div className="user-profile">
				<img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />
			</div>
			<div className="comment-detail">
				<div>
					<UserInfo commentId={comment.id} />
					<div className="date">
						{formatDate(`${comment.createdAt}`)} | <span>{commentLike} like</span>
					</div>
					<div className="comment-body">{comment.body}</div>
					<div className="suggested-price">IDR{comment.price}</div>
				</div>
				<div>
					{comment?.like.includes(user?.userId.toString()) ? (
						<button className={`like ${commentUnlikeIcon}`} onClick={handleUnlike}>
							<AiFillHeart size="1.4em" />
							{commentLike}
						</button>
					) : (
						""
					)}
					{comment?.dislike.includes(user?.userId.toString()) ? (
						<button className={`like ${commentLikeIcon}`} onClick={handleLike}>
							<AiOutlineHeart size="1.4em" />
							{commentLike}
						</button>
					) : (
						""
					)}
					{comment?.like.includes(user?.userId.toString()) && comment?.dislike.includes(user?.userId.toString()) ? (
						<button className={`like ${commentLikeIcon}`} onClick={handleLike}>
							<AiOutlineHeart size="1.4em" />
							{commentLike}
						</button>
					) : (
						""
					)}
					<button className={`like ${commentUnlikeIcon2}`} onClick={handleUnlike}>
						<AiFillHeart size="1.4em" /> {commentLike}
					</button>
					<button className={`like ${commentLikeIcon2}`} onClick={handleLike}>
						<AiOutlineHeart size="1.4em" />
						{commentLike}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Comment;
