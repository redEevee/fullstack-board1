import React from "react";
import Signup from "./Signup";
import Login from "./Login";
export default function Home() {
  return (
    <section className="tm-section tm-section-small">
      <div className="tm-content-box">
        <h2 className="tm-text-primary mb-4">환영합니다</h2>
        <p className="mb-4">
          로그인 후 게시판을 이용해 보세요. 회원가입은 로그인 페이지에서 가능합니다.
        </p>
        <h3 className="tm-text-secondary mb-4">회원가입</h3>
        <Signup />
        <h3 className="tm-text-secondary mb-4">로그인</h3>
        <Login />
        
      </div>
    </section>
  );
}