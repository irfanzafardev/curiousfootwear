import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Null from "../loading/Null";

import "./userprofile.css";
import ProfilePagePostCard from "./ProfilePagePostCard";

const UserProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const [currentUser, setCurrentUser] = useState([]);
	const [posts, setPosts] = useState([]);

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api";
	// console.log(currentUser);
	// console.log(posts);
	useEffect(() => {
		const fetchCurrentUser = async () => {
			const profileRes = await axios.get(rootAPI + "/user/profil/" + user.userId);
			const postsRes = await axios.get(rootAPI + "/post/user/" + user.userId);
			setCurrentUser(profileRes.data);
			setPosts(postsRes.data);
		};
		fetchCurrentUser();
	}, []);
	return (
		<section className="user-profile">
			<div className="container-fluid">
				<header>
					<div className="profile">
						<div className="profile-image">
							<div className="user-image">{currentUser[0]?.image ? <img src="" alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />}</div>
						</div>
						<div className="profile-details">
							<div className="user-fullname">
								{currentUser[0]?.first_name} {currentUser[0]?.last_name}
							</div>
							<div className="user-username">@{currentUser[0]?.username}</div>
							<div className="user-statistic">
								<div className="post-length">Post</div>
								<div className="follower-length">Follower</div>
								<div className="following-length">Following</div>
							</div>
							<button className="edit-button" disabled>
								Edit profile
							</button>
						</div>
					</div>
				</header>
				<div className="main">
					<div>
						<div className="nav nav-tabs" id="nav-tab" role="tablist">
							<button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
								Posts
							</button>
							<button className="nav-link" id="nav-bookmark-tab" data-bs-toggle="tab" data-bs-target="#nav-bookmark" type="button" role="tab" aria-controls="nav-bookmark" aria-selected="false">
								Bookmark
							</button>
						</div>
					</div>
					<div className="tab-content" id="nav-tabContent">
						<div className="tab-pane fade show active p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
							<div className="row">{posts.length > 0 ? posts.map((post) => <ProfilePagePostCard key={post.id} post={post} />) : <Null />}</div>
						</div>
						<div className="tab-pane fade p-3" id="nav-bookmark" role="tabpanel" aria-labelledby="nav-bookmark-tab">
							<p>To be developed</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserProfile;
