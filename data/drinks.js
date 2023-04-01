import { db } from "../db/database.js";

export async function getAll() {
  return db.execute("SELECT * FROM drinks").then((result) => {
    return result[0];
  });
}

export async function getById(id) {
  return db
    .execute("SELECT * FROM drinks WHERE drinkId=?", [id])
    .then((result) => {
      return result[0];
    });
}

export async function getIced() {
  return db
    .execute("SELECT * FROM drinks WHERE isIced=?", [true])
    .then((result) => {
      return result[0];
    });
}

export async function getHot() {
  return db
    .execute("SELECT * FROM drinks WHERE isIced=?", [false])
    .then((result) => {
      return result[0];
    });
}
