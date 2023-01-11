import axios from "axios";
import React, { useEffect, useState } from "react";

import "./userinfo.css";

const UserInfo = ({ commentId, comment, commentLike }) => {
	const [user, setUser] = useState([]);
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";
	useEffect(() => {
		const fetchComments = async () => {
			const commentRes = await axios.get(rootAPI + `comment/${commentId}`);
			const userRes = await axios.get(rootAPI + `user/profil/${commentRes.data.userId}`);
			setUser(userRes.data);
		};
		fetchComments();
	}, [commentId]);
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};
	return (
		<div className="username">
			{user.length > 0 ? (
				<>
					<div>
						{user[0].first_name} {user[0].last_name}
					</div>
					<div className="date">
						{formatDate(`${comment.createdAt}`)} • <span>{commentLike} like</span>
					</div>
				</>
			) : (
				<p>Fetching user...</p>
			)}
		</div>
	);
};

export default UserInfo;
