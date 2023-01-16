import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "./comment.css";
import { getCommentById, likeComment, unlikeComment } from "../../services/comment/singleCommentSlice";
import { useDispatch, useSelector } from "react-redux";
// import moment from "moment/moment";

const Comment = ({ comment }) => {
	const [commentLike, setCommentLike] = useState(comment?.like.length);
	const [commentLikeIcon, setCommentLikeIcon] = useState("");
	const [commentLikeIcon2, setCommentLikeIcon2] = useState("d-none");
	const [commentUnlikeIcon, setCommentUnlikeIcon] = useState("");
	const [commentUnlikeIcon2, setCommentUnlikeIcon2] = useState("d-none");

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
		if (commentLike === comment?.like.length) {
			setCommentLike(comment?.like.length + 1);
		} else {
			setCommentLike(comment?.like.length);
		}
		setCommentLikeIcon("d-none");
		setCommentLikeIcon2("d-none");
		setCommentUnlikeIcon2("d-block");
	};

	const handleUnlike = async () => {
		dispatch(unlikeComment(comment.id));
		if (commentLike === comment?.like.length) {
			setCommentLike(comment?.like.length - 1);
		} else {
			setCommentLike(comment?.like.length);
		}
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
					<UserInfo commentId={comment.id} comment={comment} commentLike={commentLike} />
					{/* <div className="date">
						{formatDate(`${comment.createdAt}`)} | <span>{commentLike} like</span>
					</div> */}
					{/* {moment("Tue Jan 10 2023 22:17:00 GMT+0700").fromNow()} */}
					<div className="comment-body">{comment.body}</div>
					<div className="suggested-price">IDR{comment.price}</div>
				</div>
				<div>
					{user ? (
						<>
							{comment?.like.includes(user?.userId.toString()) ? (
								<button className={`like ${commentUnlikeIcon}`} onClick={handleUnlike}>
									<AiFillHeart size="1.4em" />
								</button>
							) : (
								""
							)}
							{comment?.dislike.includes(user?.userId.toString()) ? (
								<button className={`like ${commentLikeIcon}`} onClick={handleLike}>
									<AiOutlineHeart size="1.4em" />
								</button>
							) : (
								""
							)}
							{!comment?.like.includes(user?.userId.toString()) && !comment?.dislike.includes(user?.userId.toString()) ? (
								<button className={`like ${commentLikeIcon}`} onClick={handleLike}>
									<AiOutlineHeart size="1.4em" />
								</button>
							) : (
								""
							)}
							<button className={`like ${commentUnlikeIcon2}`} onClick={handleUnlike}>
								<AiFillHeart size="1.4em" />
							</button>
							<button className={`like ${commentLikeIcon2}`} onClick={handleLike}>
								<AiOutlineHeart size="1.4em" />
							</button>
						</>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;
