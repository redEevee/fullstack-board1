import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostWritePage from "./pages/PostWritePage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/write" element={<PostWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
