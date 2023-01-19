import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage.jsx";
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage.jsx';
import SinglePostPage from './pages/post/SinglePostPage.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';
import ProfilePage from './pages/profile/MyProfilePage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';
import CreatePostPage from './pages/post/CreatePostPage.jsx';
import EditProfilePage from './pages/profile/EditProfilePage.jsx';
import MyProfilePage from './pages/profile/MyProfilePage.jsx';
import "./reset.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="post">
            <Route path=":id" element={<SinglePostPage />} />
            <Route path="create" element={<CreatePostPage />} />
          </Route>
          <Route path="category" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile">
            <Route path="me" element={<MyProfilePage />} />
            <Route path=":id" element={<ProfilePage />} />
            <Route path="edit" element={<EditProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App