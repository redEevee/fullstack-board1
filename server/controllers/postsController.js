const db = require("../db");
const responseHelper = require("../utils/responseHelper");

const postsController = {
  // 모든 게시글 조회
  getAllPosts: (req, res) => {
    db.query("SELECT * FROM posts ORDER BY id DESC", (err, results) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        return responseHelper.error(res, "게시글을 불러오는데 실패했습니다", 500, err);
      }
      responseHelper.success(res, results, "게시글 목록을 성공적으로 조회했습니다");
    });
  },

  // 특정 게시글 조회
  getPostById: (req, res) => {
    const { id } = req.params;
    
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        return responseHelper.error(res, "게시글을 불러오는데 실패했습니다", 500, err);
      }
      
      if (results.length === 0) {
        return responseHelper.notFound(res, "해당 게시글을 찾을 수 없습니다");
      }
      
      responseHelper.success(res, results[0], "게시글을 성공적으로 조회했습니다");
    });
  },

  // 게시글 작성
  createPost: (req, res) => {
    const { title, content } = req.body;
    
    // 기본 검증
    if (!title || !content) {
      return responseHelper.badRequest(res, "제목과 내용을 모두 입력해주세요");
    }

    db.query("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], (err, result) => {
      if (err) {
        console.error("게시글 생성 오류:", err);
        return responseHelper.error(res, "게시글 작성에 실패했습니다", 500, err);
      }
      
      const newPost = { id: result.insertId, title, content };
      responseHelper.success(res, newPost, "게시글이 성공적으로 작성되었습니다", 201);
    });
  },

  // 게시글 수정
  updatePost: (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // 기본 검증
    if (!title || !content) {
      return responseHelper.badRequest(res, "제목과 내용을 모두 입력해주세요");
    }

    // 먼저 게시글 존재 확인
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        return responseHelper.error(res, "게시글 조회에 실패했습니다", 500, err);
      }

      if (results.length === 0) {
        return responseHelper.notFound(res, "수정할 게시글을 찾을 수 없습니다");
      }

      // 게시글 업데이트
      db.query("UPDATE posts SET title=?, content=? WHERE id=?", [title, content, id], (err) => {
        if (err) {
          console.error("게시글 수정 오류:", err);
          return responseHelper.error(res, "게시글 수정에 실패했습니다", 500, err);
        }
        
        responseHelper.success(res, { id, title, content }, "게시글이 성공적으로 수정되었습니다");
      });
    });
  },

  // 게시글 삭제
  deletePost: (req, res) => {
    const { id } = req.params;

    // 먼저 게시글 존재 확인
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("게시글 조회 오류:", err);
        return responseHelper.error(res, "게시글 조회에 실패했습니다", 500, err);
      }

      if (results.length === 0) {
        return responseHelper.notFound(res, "삭제할 게시글을 찾을 수 없습니다");
      }

      // 게시글 삭제
      db.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
        if (err) {
          console.error("게시글 삭제 오류:", err);
          return responseHelper.error(res, "게시글 삭제에 실패했습니다", 500, err);
        }
        
        responseHelper.success(res, null, "게시글이 성공적으로 삭제되었습니다");
      });
    });
  }
};

module.exports = postsController;