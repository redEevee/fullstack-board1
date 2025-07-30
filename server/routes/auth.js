const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

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

module.exports = router;
