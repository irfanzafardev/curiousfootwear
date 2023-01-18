import axios from "axios"

const POST_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/post/"
const ALL_POST_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/post/all"
const LIKE_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/user/like/"
const UNLIKE_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/user/dislike/"
const DELETE_POST_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/post/"
const VIEW_POST_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/post/view/"


// Get all post
const getAllPost = async () => {
  const response = await axios.get(ALL_POST_BASE_URL)

  return response.data
}

// Get current post
const getCurrentPost = async (postId) => {
  const response = await axios.get(POST_BASE_URL + postId)

  return response.data
}

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(POST_BASE_URL, postData, config)

  return response.data
}

// Like post
const likePost = async (postId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axios.put(LIKE_BASE_URL + postId)
  return response.data

  // const response = await axios.put(LIKE_BASE_URL + postId, config)

  // return response.data
}

// Unlike post
const unlikePost = async (postId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }


  // const response = await axios.put(LIKE_BASE_URL + postId, config)

  // return response.data
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axios.put(UNLIKE_BASE_URL + postId)
  return response.data
}

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(DELETE_POST_BASE_URL + postId, config)

  return response.data
}
// View post
const viewPost = async (postId) => {
  const response = await axios.put(VIEW_POST_BASE_URL + postId)
  return response.data
}

const postService = {
  getAllPost,
  getCurrentPost,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  viewPost
}

export default postService