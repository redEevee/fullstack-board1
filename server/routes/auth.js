const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashed],
    (err, result) => {
      if (err) return res.status(500).send("회원가입 실패");
      res.status(201).send("회원가입 완료");
    }
  );
});
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).send("이메일 없음");
      const match = await bcrypt.compare(password, results[0].password);
      if (!match) return res.status(401).send("비밀번호 틀림");

      const token = jwt.sign({ userId: results[0].id }, "SECRET_KEY", {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  );
});

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;

const verifyToken = require("./middleware/verifyToken");

router.post("/posts", verifyToken, (req, res) => {
  // 로그인한 사용자만 글 작성 가능
});
