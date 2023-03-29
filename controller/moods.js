import * as moodRepository from "../data/moods.js";

export async function getMoods(req, res) {
  const list = await moodRepository.getAll();
  res.status(200).json(list);
}

export async function getMood(req, res) {
  const id = req.params.id;
  const mood = await moodRepository.getById(id);

  if (mood) {
    res.status(200).json(mood);
  } else {
    res.status(404).json({ message: `mood id ${id} not found` });
  }
}
