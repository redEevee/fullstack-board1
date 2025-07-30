# React + Node.js + MySQL 게시판

## 사용 방법

1. MySQL에 `board_db` 생성 및 `posts` 테이블 생성, users 테이블생성

```sql
CREATE DATABASE board_db;
USE board_db;
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```


2. `server/.env` 파일 설정

```bash
cd server
cp .env.example .env
# .env 파일을 열어 실제 DB 정보와 JWT_SECRET 값을 입력하세요.
```

3. 서버 실행

```
cd server
npm install
npm start
```

4. 클라이언트 실행

```
cd client
npm install
npm start
```

API 서버는 `localhost:5001`, React는 `localhost:3000`에서 실행됩니다.

## 주요 API 엔드포인트

- `POST /api/auth/signup` - 회원 가입
- `POST /api/auth/login` - 로그인 후 JWT 토큰 반환
- `GET /api/posts` - 게시글 목록 조회
- `GET /api/posts/:id` - 게시글 상세 조회
- `POST /api/posts` - 게시글 작성 (JWT 필요)
- `PUT /api/posts/:id` - 게시글 수정 (JWT 필요)
- `DELETE /api/posts/:id` - 게시글 삭제 (JWT 필요)
