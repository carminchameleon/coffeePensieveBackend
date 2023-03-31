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

export async function createTag(req, res) {
  const { tagName } = req.body;

  const tagId = await tagRepository.create(tagName);
  if (tagId) {
    res.status(200).json({ tagId });
  } else {
    res.status(403).json({ message: "check your tag name again" });
  }
}
