# CLAUDE.md

이 파일은 이 리포지토리에서 코드 작업을 수행할 때 Claude Code(claude.ai/code)에게 가이드를 제공합니다.

## 개발 명령어

### 클라이언트 (React)
```bash
cd client
npm install
npm start  # localhost:3000에서 실행
```

### 서버 (Node.js/Express)
```bash
cd server
npm install
npm start  # localhost:5001에서 실행
```

### 데이터베이스 설정
1. MySQL 데이터베이스 및 테이블 생성:
```sql
CREATE DATABASE board_db;
USE board_db;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

2. 서버 환경 설정:
```bash
cd server
cp .env.example .env
# 실제 DB 정보와 JWT_SECRET을 .env 파일에 입력
```

## 아키텍처

### 기술 스택
- **프론트엔드**: React Router, Axios, TailwindCSS가 포함된 React 18
- **백엔드**: JWT 인증이 포함된 Node.js/Express  
- **데이터베이스**: mysql2 드라이버를 사용한 MySQL
- **인증**: bcrypt 패스워드 해싱을 사용한 JWT 토큰

### 프로젝트 구조
```
├── client/          # React 프론트엔드
│   ├── src/
│   │   ├── api/     # API 서비스 모듈 (authApi.js, postApi.js)
│   │   ├── components/  # 재사용 가능한 컴포넌트 (PostItem.jsx)
│   │   └── pages/   # 라우트 컴포넌트 (Login, Signup, Post 페이지들)
│   └── package.json
├── server/          # Express 백엔드
│   ├── routes/      # API 라우트 (auth.js, posts.js)
│   ├── middleware/  # 인증 미들웨어 (verifyToken.js)
│   ├── db.js        # MySQL 연결
│   └── index.js     # 서버 진입점
└── package.json     # 루트 의존성
```

### API 아키텍처
- **인증 엔드포인트**: `/api/auth/*` - JWT를 사용한 회원가입, 로그인
- **게시글 엔드포인트**: `/api/posts/*` - CRUD 작업 (보호된 라우트는 JWT 필요)
- **미들웨어**: 보호된 라우트를 위한 JWT 검증
- **데이터베이스**: 직접적인 MySQL 쿼리 (ORM 없음)

### 주요 패턴
- `client/src/api/`의 API 서비스가 HTTP 요청 처리
- 클라이언트에서 JWT 토큰을 localStorage에 저장
- 보호된 라우트는 `verifyToken` 미들웨어 사용
- React Router가 클라이언트 사이드 라우팅 처리
- TailwindCSS를 사용한 글로벌 CSS 스타일링

## 환경 설정
서버에는 다음을 포함한 `.env` 파일 필요:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - MySQL 연결
- `JWT_SECRET` - JWT 서명을 위한 비밀 키

## 개발 참고사항
- 테스트 프레임워크 설정 없음
- `react-scripts` 외에 빌드 프로세스 없음
- 서버는 5001 포트, 클라이언트는 3000 포트에서 실행
- 교차 출처 요청을 위한 CORS 활성화