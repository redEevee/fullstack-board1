const { body, param, validationResult } = require('express-validator');
const responseHelper = require('../utils/responseHelper');

// 검증 결과 처리 미들웨어
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    return responseHelper.badRequest(res, "입력 데이터 검증에 실패했습니다", errorMessages);
  }
  next();
};

// 회원가입 검증 규칙
const validateSignup = [
  body('email')
    .isEmail()
    .withMessage('올바른 이메일 형식을 입력해주세요')
    .normalizeEmail()
    .isLength({ min: 1, max: 100 })
    .withMessage('이메일은 1-100자 사이여야 합니다'),
  
  body('password')
    .isLength({ min: 6, max: 100 })
    .withMessage('비밀번호는 6-100자 사이여야 합니다')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다'),
  
  handleValidationErrors
];

// 로그인 검증 규칙
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('올바른 이메일 형식을 입력해주세요')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해주세요'),
  
  handleValidationErrors
];

// 게시글 작성/수정 검증 규칙
const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('제목은 1-100자 사이여야 합니다')
    .escape(), // XSS 방지
  
  body('content')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('내용은 1-10000자 사이여야 합니다'),
  
  handleValidationErrors
];

// 게시글 ID 검증 규칙
const validatePostId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('올바른 게시글 ID를 입력해주세요'),
  
  handleValidationErrors
];

module.exports = {
  validateSignup,
  validateLogin,
  validatePost,
  validatePostId,
  handleValidationErrors
};