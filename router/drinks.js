import express from "express";
import "express-async-errors";

import * as drinkController from "../controller/drinks.js";

const router = express.Router();
export default router;

// GET /Drinks
router.get("/", drinkController.getDrinks);

// GET /Drinks/iced
router.get("/iced", drinkController.getIcedDrinks);

// GET /drinks/hot
router.get("/hot", drinkController.getHotDrinks);

// GET /drinks/:id
router.get("/:id", drinkController.getDrink);
