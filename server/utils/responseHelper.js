const responseHelper = {
  success: (res, data = null, message = "성공", statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  },

  error: (res, message = "오류가 발생했습니다", statusCode = 500, error = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : null
    });
  },

  notFound: (res, message = "리소스를 찾을 수 없습니다") => {
    return res.status(404).json({
      success: false,
      message
    });
  },

  unauthorized: (res, message = "인증이 필요합니다") => {
    return res.status(401).json({
      success: false,
      message
    });
  },

  forbidden: (res, message = "권한이 없습니다") => {
    return res.status(403).json({
      success: false,
      message
    });
  },

  badRequest: (res, message = "잘못된 요청입니다", errors = null) => {
    return res.status(400).json({
      success: false,
      message,
      errors
    });
  }
};

module.exports = responseHelper;