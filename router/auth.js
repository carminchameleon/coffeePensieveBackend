import express from "express";
import "express-async-errors";
import { body } from "express-validator";

import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

// 로그인
const validateCredential = [
  body("username")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("username should be email form"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
];

// TODO 기타 저장 정보에 대한 validate 추가필요
const validateSignup = [
  ...validateCredential,
  body("nickname")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("nickname is missing or too long"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }), // 필드 자체가 없거나, 값이 없어도 받아줄 것이고 있을 경우에는 검사할 것이다.
  body("limitCups").isInt().withMessage("limit cup should be integer"),
  body("wakeUpReminder")
    .isBoolean()
    .withMessage("wake up reminder should be boolean"),
  body("bedTimeReminder")
    .isBoolean()
    .withMessage("bed time reminder should be boolean"),
  body("limitReminder")
    .isBoolean()
    .withMessage("limit reminder should be boolean"),
];

const router = express.Router();
export default router;

// POST /auth/signup
router.post("/signup", validateSignup, validate, authController.signUp);

// POST /auth/login
router.post("/login", validateCredential, validate, authController.logIn);

// GET /auth/me
// 검증 해야 할 header가 있는 상태
// 로그인 한 다음 내가 유효한지 확인하는 API임
router.get("/me", isAuth, authController.getMe);
