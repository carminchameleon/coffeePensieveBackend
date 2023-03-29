import express from "express";
import "express-async-errors";
import { body } from "express-validator";

import * as commitController from "../controller/commits.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();
export default router;

// GET /commits
// GET /commits?userId=:userId
router.get("/", isAuth, commitController.getCommit);

// GET /commits/:id
router.get("/:id", isAuth, commitController.getCommitWithId);

// POST /commits
router.post(
  "/",
  body("tagList").isArray().withMessage("tag list should be array"),
  validate,
  isAuth,
  commitController.postCommit
);

// DELETE /commits/:id
router.delete("/:id", isAuth, commitController.deleteCommit);
