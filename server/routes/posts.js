const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  db.query("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title, content });
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM posts WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

router.put("/:id", (req, res) => {
  const { title, content } = req.body;
  db.query("UPDATE posts SET title=?, content=? WHERE id=?", [title, content, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
