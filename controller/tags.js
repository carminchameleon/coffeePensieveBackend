import * as tagRepository from "../data/tags.js";

export async function getTags(req, res) {
  const tags = await tagRepository.getAll();
  res.status(200).json(tags);
}

export async function getTag(req, res) {
  const id = req.params.id;
  const state = await tagRepository.getById(id);

  if (state) {
    res.status(200).json(state);
  } else {
    res.status(404).json({ message: `tag id ${id} not found` });
  }
}
