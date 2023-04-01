import { db } from "../db/database.js";

export async function getAll() {
  return db.execute("SELECT * FROM moods").then((result) => {
    return result[0];
  });
}

export async function getById(id) {
  return db
    .execute("SELECT * FROM moods WHERE moodId=?", [id])
    .then((result) => {
      return result[0][0];
    });
}
