import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePosts } from "../contexts/PostsContext";

export default function PostListPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { posts, fetchPosts, isLoading } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container">
      <header className="header">
        <h1>게시판</h1>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <span>안녕하세요, {user?.email}님!</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                로그아웃
              </button>
              <br /><br />
              <Link to="/write">✍️ 글쓰기</Link>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </header>
      {isLoading ? (
        <div>게시글을 불러오는 중...</div>
      ) : (
        <ul className="post-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} className="post-item">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
                <small>{new Date(post.created_at).toLocaleDateString()}</small>
              </li>
            ))
          ) : (
            <li className="post-item">게시글이 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
}
