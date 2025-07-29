import React from "react";

export default function Signup() {
  return (
    <section className="tm-section tm-section-small">
      <div className="tm-content-box">
        <h2 className="tm-text-primary mb-4">회원가입</h2>
        <form>
          <input className="form-control mb-3" placeholder="이메일" />
          <input className="form-control mb-3" placeholder="비밀번호" type="password" />
          <input className="form-control mb-3" placeholder="비밀번호 확인" type="password" />
          <button className="btn btn-success btn-block">회원가입</button>
        </form>
      </div>
    </section>
  );
}
