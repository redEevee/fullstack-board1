import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../api/postApi";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>게시판</h1>
        <div className="nav-links">
          {token ? (
            <>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                  navigate("/login");
                }}
              >
                로그아웃

              </button>
              <br /><br />

              <p className="magin">  </p>

              <p className="magin">  </p>

              <Link to="/write">✍️ 글쓰기</Link>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </header>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
