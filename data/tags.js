import { db } from "../db/database.js";
const tags = [
  {
    tagId: "1",
    tagName: "morning",
  },
  {
    tagId: "2",
    tagName: "lunch",
  },
  {
    tagId: "3",
    tagName: "dinner",
  },
  {
    tagId: "4",
    tagName: "concentrating",
  },
  {
    tagId: "5",
    tagName: "refreshing",
  },
  {
    tagId: "6",
    tagName: "working out",
  },
  {
    tagId: "7",
    tagName: "socializing",
  },
  {
    tagId: "8",
    tagName: "chilling",
  },
];

export async function getAll() {
  return tags;
}

export async function getById(id) {
  const tag = tags.find((x) => x.tagId === id);
  return tag;
}

export async function create(tagName) {
  return db
    .execute("INSERT INTO tags (tagName) VALUES (?)", [tagName])
    .then((result) => {
      return result[0].insertId;
    });
}
