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
    <section className="tm-section tm-section-small">
      <div className="tm-content-box">
        <h2 className="tm-text-primary mb-4">게시글 수정</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
          <textarea
            className="form-control mb-3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
          />
          <button type="submit" className="btn btn-warning btn-block">수정하기</button>
        </form>
      </div>
    </section>
  );
}