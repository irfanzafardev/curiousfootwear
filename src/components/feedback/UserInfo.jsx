import axios from "axios";
import React, { useEffect, useState } from "react";

const UserInfo = ({ commentId }) => {
	const [user, setUser] = useState([]);
	// console.log(user);
	// console.log(commentId);
	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";
	useEffect(() => {
		const fetchComments = async () => {
			const commentRes = await axios.get(rootAPI + `comment/${commentId}`);
			const userRes = await axios.get(rootAPI + `user/profil/${commentRes.data.userId}`);
			setUser(userRes.data);
		};
		fetchComments();
	}, [commentId]);
	return (
		<div className="username">
			{user.length > 0 ? (
				<div>
					{user[0].first_name} {user[0].last_name}
				</div>
			) : (
				<p>fetching user</p>
			)}
		</div>
	);
};

export default UserInfo;
