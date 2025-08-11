require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

// 보안 헤더 설정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting 설정
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 요청 수 제한
  message: {
    success: false,
    message: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// 인증 관련 더 엄격한 rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 5, // 로그인/회원가입 시도 횟수 제한
  message: {
    success: false,
    message: "로그인 시도가 너무 많습니다. 15분 후 다시 시도해주세요."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// 기본 미들웨어
app.use(generalLimiter);
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 라우트
app.use("/api/posts", postRoutes);
app.use("/api/auth", authLimiter, authRoutes);

// 헬스 체크 엔드포인트
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 에러 핸들러 (모든 라우트 다음에)
app.use(notFoundHandler);

// 전역 에러 핸들러 (마지막에)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`환경: ${process.env.NODE_ENV || 'development'}`);
});
