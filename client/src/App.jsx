import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostWritePage from "./pages/PostWritePage";
import PostEditPage from "./pages/PostEditPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "react-toastify/dist/ReactToastify.css";
import './global.css';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/write" element={<PostWritePage />} />
        <Route path="/edit/:id" element={<PostEditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
