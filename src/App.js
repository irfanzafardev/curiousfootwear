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
import ProfilePage from './pages/profile/ProfilePage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';
import "./reset.css";
import CreatePostPage from './pages/post/CreatePostPage.jsx';

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
            <Route path="me" element={<ProfilePage />} />
            <Route path=":id" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App