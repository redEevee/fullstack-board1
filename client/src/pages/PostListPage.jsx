import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postApi";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <section className="tm-section tm-section-small">
      <div className="tm-content-box">
        <h2 className="tm-text-primary mb-4">게시판</h2>
        <Link to="/write" className="btn btn-info mb-3">✍️ 글쓰기</Link>
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
