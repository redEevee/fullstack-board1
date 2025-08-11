const jwt = require("jsonwebtoken");
const responseHelper = require("../utils/responseHelper");

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return responseHelper.unauthorized(res, "Authorization 헤더가 없습니다");
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return responseHelper.unauthorized(res, "토큰이 제공되지 않았습니다");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    req.user = decoded;
    next();
    
  } catch (err) {
    console.error("토큰 검증 오류:", err);
    
    if (err.name === "TokenExpiredError") {
      return responseHelper.unauthorized(res, "토큰이 만료되었습니다");
    } else if (err.name === "JsonWebTokenError") {
      return responseHelper.forbidden(res, "유효하지 않은 토큰입니다");
    } else {
      return responseHelper.error(res, "토큰 검증 중 오류가 발생했습니다", 500, err);
    }
  }
}

module.exports = verifyToken;
