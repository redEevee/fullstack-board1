const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const responseHelper = require("../utils/responseHelper");

const authController = {
  // 회원가입
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 기본 검증
      if (!email || !password) {
        return responseHelper.badRequest(res, "이메일과 비밀번호를 모두 입력해주세요");
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return responseHelper.badRequest(res, "올바른 이메일 형식을 입력해주세요");
      }

      // 비밀번호 길이 검증
      if (password.length < 6) {
        return responseHelper.badRequest(res, "비밀번호는 최소 6자리 이상이어야 합니다");
      }

      // 중복 이메일 확인
      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
          console.error("중복 이메일 확인 오류:", err);
          return responseHelper.error(res, "회원가입 처리 중 오류가 발생했습니다", 500, err);
        }

        if (results.length > 0) {
          return responseHelper.badRequest(res, "이미 사용중인 이메일입니다");
        }

        // 비밀번호 해시화
        const hashed = await bcrypt.hash(password, 12);
        
        // 사용자 생성
        db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed], (err, result) => {
          if (err) {
            console.error("회원가입 오류:", err);
            return responseHelper.error(res, "회원가입에 실패했습니다", 500, err);
          }
          
          responseHelper.success(res, { id: result.insertId, email }, "회원가입이 완료되었습니다", 201);
        });
      });

    } catch (error) {
      console.error("회원가입 처리 오류:", error);
      responseHelper.error(res, "회원가입 처리 중 오류가 발생했습니다", 500, error);
    }
  },

  // 로그인
  login: (req, res) => {
    const { email, password } = req.body;

    // 기본 검증
    if (!email || !password) {
      return responseHelper.badRequest(res, "이메일과 비밀번호를 모두 입력해주세요");
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("로그인 조회 오류:", err);
        return responseHelper.error(res, "로그인 처리 중 오류가 발생했습니다", 500, err);
      }

      if (results.length === 0) {
        return responseHelper.unauthorized(res, "등록되지 않은 이메일입니다");
      }

      try {
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
          return responseHelper.unauthorized(res, "비밀번호가 일치하지 않습니다");
        }

        // JWT 토큰 생성
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "SECRET_KEY",
          { expiresIn: "24h" }
        );

        responseHelper.success(res, { 
          token, 
          user: { id: user.id, email: user.email } 
        }, "로그인이 완료되었습니다");

      } catch (error) {
        console.error("비밀번호 비교 오류:", error);
        responseHelper.error(res, "로그인 처리 중 오류가 발생했습니다", 500, error);
      }
    });
  },

  // 토큰 검증 (현재 사용자 정보 조회)
  verifyToken: (req, res) => {
    const user = req.user; // verifyToken 미들웨어에서 설정된 사용자 정보
    responseHelper.success(res, { user }, "토큰이 유효합니다");
  }
};

module.exports = authController;