const responseHelper = require("../utils/responseHelper");

const errorHandler = (err, req, res, next) => {
  console.error("전역 에러 핸들러:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // 특정 에러 타입별 처리
  if (err.name === "ValidationError") {
    return responseHelper.badRequest(res, "입력 데이터 검증 실패", err.details);
  }
  
  if (err.name === "UnauthorizedError") {
    return responseHelper.unauthorized(res, "인증이 필요합니다");
  }
  
  if (err.code === "ER_DUP_ENTRY") {
    return responseHelper.badRequest(res, "중복된 데이터입니다");
  }
  
  if (err.code === "ER_BAD_FIELD_ERROR") {
    return responseHelper.badRequest(res, "잘못된 필드입니다");
  }

  // 기본 서버 에러
  responseHelper.error(res, "서버 내부 오류가 발생했습니다", 500, err);
};

// 404 에러 핸들러
const notFoundHandler = (req, res) => {
  responseHelper.notFound(res, `경로를 찾을 수 없습니다: ${req.method} ${req.url}`);
};

module.exports = { errorHandler, notFoundHandler };