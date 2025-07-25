# React + Node.js + MySQL 게시판

## 사용 방법

1. MySQL에 `board_db` 생성 및 `posts` 테이블 생성

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

2. 서버 실행

```
cd server
npm install
npm start
```

3. 클라이언트 실행

```
cd client
npm install
npm start
```

API 서버는 `localhost:5000`, React는 `localhost:3000`에서 실행됩니다.
