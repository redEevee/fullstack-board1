import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signup(email, password);
      if (result.success) {
        alert(`✅ ${result.message}\n로그인 페이지로 이동합니다.`);
        navigate("/login");
      } else {
        // 서버에서 보내는 상세한 에러 메시지 표시
        let errorMessage = `❌ 회원가입 실패\n\n${result.message}`;
        
        // 입력 검증 에러가 있는 경우 상세 내용 추가
        if (result.errors && Array.isArray(result.errors)) {
          errorMessage += "\n\n상세 오류:";
          result.errors.forEach(error => {
            errorMessage += `\n• ${error.field}: ${error.message}`;
          });
        }
        
        alert(errorMessage);
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      
      // 네트워크 에러나 서버 에러 구분해서 표시
      let errorMessage = "❌ 회원가입 중 오류가 발생했습니다\n\n";
      
      if (error.response) {
        // 서버에서 응답이 온 경우
        const serverError = error.response.data;
        errorMessage += `서버 오류 (${error.response.status}): ${serverError.message || '알 수 없는 오류'}`;
        
        if (serverError.errors && Array.isArray(serverError.errors)) {
          errorMessage += "\n\n상세 오류:";
          serverError.errors.forEach(err => {
            errorMessage += `\n• ${err.field}: ${err.message}`;
          });
        }
      } else if (error.request) {
        // 네트워크 에러
        errorMessage += "네트워크 연결을 확인해주세요.\n서버가 실행 중인지 확인해보세요.";
      } else {
        // 기타 에러
        errorMessage += error.message || "알 수 없는 오류가 발생했습니다.";
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "가입 중..." : "가입하기"}
      </button>
      <p>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </p>
    </form>
  );
}
