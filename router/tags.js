import express from "express";
import "express-async-errors";

import * as tagController from "../controller/tags.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";

const router = express.Router();

export default router;

// GET /tags
router.get("/", tagController.getTags);

// Get /tags/:id
router.get("/:id", tagController.getTag);

router.post(
  "/",
  body("tagName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("tag name should be at least 1"),
  validate,
  tagController.createTag
);
