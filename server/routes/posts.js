const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const postsController = require("../controllers/postsController");
const { validatePost, validatePostId } = require("../middleware/validation");

// 게시글 목록 조회
router.get("/", postsController.getAllPosts);

// 게시글 상세 조회
router.get("/:id", validatePostId, postsController.getPostById);

// 게시글 작성 (인증 필요)
router.post("/", verifyToken, validatePost, postsController.createPost);

// 게시글 수정 (인증 필요)
router.put("/:id", verifyToken, validatePostId, validatePost, postsController.updatePost);

// 게시글 삭제 (인증 필요)
router.delete("/:id", verifyToken, validatePostId, postsController.deletePost);

module.exports = router;
