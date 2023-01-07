import React from "react";
import CreatePostForm from "../../components/post/CreatePostForm";

const CreatePostPage = ({ setOpen }) => {
	return (
		<div>
			<CreatePostForm setOpen={setOpen} />
		</div>
	);
};

export default CreatePostPage;
