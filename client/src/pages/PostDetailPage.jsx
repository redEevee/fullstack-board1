import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/postApi";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
