import express from "express";
import "express-async-errors";

import * as tagController from "../controller/tags.js";

const router = express.Router();
export default router;

// GET /tags
router.get("/", tagController.getTags);

// Get /tags/:id
router.get("/:id", tagController.getTag);
