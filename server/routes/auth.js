const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authController = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validation");

// 회원가입
router.post("/signup", validateSignup, authController.signup);

// 로그인
router.post("/login", validateLogin, authController.login);

// 토큰 검증 (현재 사용자 정보)
router.get("/verify", verifyToken, authController.verifyToken);

module.exports = router;
