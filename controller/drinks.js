import * as drinkRepository from "../data/drinks.js";

export async function getDrinks(req, res) {
  const drinks = await drinkRepository.getAll();
  res.status(200).json(drinks);
}

export async function getIcedDrinks(req, res, next) {
  const icedList = await drinkRepository.getIced();
  res.status(200).json(icedList);
}

export async function getHotDrinks(req, res, next) {
  const hotList = await drinkRepository.getHot();
  res.status(200).json(hotList);
}

export async function getDrink(req, res, next) {
  const id = req.params.id;
  const drink = await drinkRepository.getById(id);

  if (drink) {
    res.status(200).json(drink);
  } else {
    res.status(404).json({ message: `drink id ${req.params.id} not found` });
  }
}
