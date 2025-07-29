import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../api/postApi";
import { useState, useEffect } from "react";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getPost(id).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, { title, content });
    alert("✅ 수정되었습니다!");
    navigate(`/post/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>게시글 수정</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <button type="submit">수정하기</button>
    </form>
  );
}
