import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api/postApi";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then((res) => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      await deletePost(id);
      alert("✅ 게시글이 삭제되었습니다.");
      navigate("/");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleEdit}>✏️ 수정</button>
      <button onClick={handleDelete}>🗑️ 삭제</button>
    </div>
  );
}
