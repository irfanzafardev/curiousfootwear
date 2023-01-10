import axios from "axios";

const COMMENT_BASE_URL =
  "https://thecuriousfootwear-server.vercel.app/api/comment/";
const ALL_COMMENT_BASE_URL =
  "https://thecuriousfootwear-server.vercel.app/api/comment/getCommentsByPostId/";
const LIKE_COMMENT_BASE_URL =
  "https://thecuriousfootwear-server.vercel.app/api/user/likeComment/";
const UNLIKE_COMMENT_BASE_URL =
  "https://thecuriousfootwear-server.vercel.app/api/user/dislikeComment/";
const MOST_LIKED_COMMENTS_BASE_URL =
  "https://thecuriousfootwear-server.vercel.app/api/comment/getCommentsByMostLiked/";

// Get all comment by postId
const getAllCommentByPostId = async (postId) => {
  const response = await axios.get(ALL_COMMENT_BASE_URL + postId);

  return response.data;
};

// Create new comment
const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(COMMENT_BASE_URL, commentData, config);

  return response.data;
};

// Get comment by Id
const getCommentById = async (commentId) => {
  const response = await axios.get(COMMENT_BASE_URL + commentId);

  return response.data;
};

// Like comment
const likeComment = async (commentId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  // const response = await axios.put(LIKE_COMMENT_BASE_URL + commentId, config)

  // return response.data
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.put(LIKE_COMMENT_BASE_URL + commentId);
  return response.data;
};

// Unlike comment
const unlikeComment = async (commentId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  // const response = await axios.put(LIKE_COMMENT_BASE_URL + commentId, config)

  // return response.data
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.put(UNLIKE_COMMENT_BASE_URL + commentId);
  return response.data;
};

// get most liked comments
const getMostLikedCommentsByPostId = async (postId) => {
  const response = await axios.get(MOST_LIKED_COMMENTS_BASE_URL + postId);
  return response.data;
};

const commentService = {
  getAllCommentByPostId,
  createComment,
  getCommentById,
  likeComment,
  unlikeComment,
  getMostLikedCommentsByPostId,
};

export default commentService;
