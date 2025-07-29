import React from "react";

export default function Login() {
  return (
    <section className="tm-section tm-section-small">
      <div className="tm-content-box">
        <h2 className="tm-text-primary mb-4">로그인</h2>
        <form>
          <input className="form-control mb-3" placeholder="이메일" />
          <input className="form-control mb-3" placeholder="비밀번호" type="password" />
          <button className="btn btn-primary btn-block">로그인</button>
        </form>
      </div>
    </section>
  );
}