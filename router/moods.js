import express from "express";
import "express-async-errors";

import { validate } from "../middleware/validator.js";
import { body } from "express-validator";
import * as moodController from "../controller/moods.js";

const router = express.Router();
export default router;

// GET /moods
router.get("/", moodController.getMoods);

// Get /moods/:id
router.get("/:id", moodController.getMood);
