import axios from "axios"

const COMMENT_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/comment/"
const LIKE_COMMENT_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/user/likeComment/"
const UNLIKE_COMMENT_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/user/dislikeComment/"

// Get comment by Id
const getCommentById = async (commentId) => {
  const response = await axios.get(COMMENT_BASE_URL + commentId)

  return response.data
}

// Like comment
const likeComment = async (commentId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  // const response = await axios.put(LIKE_COMMENT_BASE_URL + commentId, config)

  // return response.data
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axios.put(LIKE_COMMENT_BASE_URL + commentId)
  return response.data
}

// Unlike comment
const unlikeComment = async (commentId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  // const response = await axios.put(LIKE_COMMENT_BASE_URL + commentId, config)

  // return response.data
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axios.put(UNLIKE_COMMENT_BASE_URL + commentId)
  return response.data
}

const commentService = {
  getCommentById,
  likeComment,
  unlikeComment
}

export default commentService