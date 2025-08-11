import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PostsProvider, usePosts } from "./contexts/PostsContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostListPage from "./pages/PostListPage";
// import PostDetailPage from "./pages/PostDetailPage";
// import PostWritePage from "./pages/PostWritePage";  
// import PostEditPage from "./pages/PostEditPage";
import './global.css';

// 모든 Context를 사용하는 테스트 컴포넌트
function HomePage() {
  const { isLoading: authLoading, isAuthenticated, user } = useAuth();
  const { posts, isLoading: postsLoading } = usePosts();
  
  if (authLoading) {
    return <div>인증 로딩 중...</div>;
  }

  return (
    <div className="container">
      <h1>홈 페이지</h1>
      <p>모든 Context 테스트 중...</p>
      <p>인증 상태: {isAuthenticated ? '로그인됨' : '로그인 안됨'}</p>
      {user && <p>사용자: {user.email}</p>}
      <p>게시글 로딩 중: {postsLoading ? '예' : '아니오'}</p>
      <p>게시글 개수: {posts.length}</p>
    </div>
  );
}

function TestPage() {
  return (
    <div className="container">
      <h1>테스트 페이지</h1>
      <p>라우터가 정상 작동합니다</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;
