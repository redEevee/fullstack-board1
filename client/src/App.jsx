import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostListPage from "./pages/PostListPage";
import PostWritePage from "./pages/PostWritePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostEditPage from "./pages/PostEditPage";

export default function App() {
  return (
    <div className="tm-page-wrap mx-auto">
      <Header />
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board" element={<PostListPage />} />
          <Route path="/write" element={<PostWritePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/edit/:id" element={<PostEditPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
