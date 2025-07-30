import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postApi";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h1>게시판</h1>
      <Link to="/login">로그인</Link>
      <Link to="/write">✍️ 글쓰기</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
