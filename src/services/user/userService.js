import axios from "axios"

const USER_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/user/"
const EDIT_USER_BASE_URL = "https://thecuriousfootwear-server.vercel.app/api/user/profil/edit/"

// Get current user
const getCurrentUser = async (userId) => {
  const response = await axios.get(USER_BASE_URL + 'profil/' + userId)

  return response.data[0]
}

// Follow user
const followUser = async (userId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axios.put(USER_BASE_URL + 'follow/' + userId)
  return response.data

  // const response = await axios.put(LIKE_BASE_URL + postId, config)

  // return response.data
}

// Follow user
const unfollowUser = async (userId, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await axios.put(USER_BASE_URL + 'unfollow/' + userId)
  return response.data

  // const response = await axios.put(LIKE_BASE_URL + postId, config)

  // return response.data
}

// Create new post
const editProfile = async (userId, profileData, token) => {
  const response = await axios.put(EDIT_USER_BASE_URL + userId, profileData)

  return response.data
}

const userService = {
  getCurrentUser,
  followUser,
  unfollowUser,
  editProfile
}

export default userService