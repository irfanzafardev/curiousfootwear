import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SuggestedPrice = ({ post }) => {
	const [mostLikedComments, setMostLikedComments] = useState([]);
	const dispatch = useDispatch();
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";

	useEffect(() => {
		const fetchMostLikedComments = async (postId) => {
			const commentResp = await axios.get(rootAPI + `comment/getCommentsByMostLiked/${postId}`);
			// dispatch(getMostLikedCommentsByPostId(postId)).then(() => {
			// });
			setMostLikedComments(commentResp.data);
		};
		fetchMostLikedComments(post._id);
	}, [post._id, dispatch]);
	return <div className="suggested-price">{mostLikedComments ? <p>IDR{mostLikedComments[0]?.suggestedPrice || "0"}</p> : <p>-</p>}</div>;
};

export default SuggestedPrice;
