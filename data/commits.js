import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT c.commitId, c.createdAt, c.memo, u.username, u.url FROM commits as c JOIN users as u ON c.userId=u.userId";
const ORDER_DESC = "ORDER BY commits.createdAt DESC";

const DRINK_JOIN = "JOIN drinks as d ON c.drinkId=d.drinkId";
const MOOD_JOIN = "JOIN moods as m ON c.moodId=m.moodId";
const USER_JOIN = "JOIN users as u ON c.userId=u.userId";

const USER_INFO = "u.userId, u.username, u.url";
const COMMIT_INFO = "c.commitId, c.createdAt, c.tagList, c.memo";
const DRINK_INFO = "d.drinkId, d.drinkName, d.drinkImage, d.isIced";
const MOOD_INFO = "m.moodId, m.moodName, m.emoji";

const MOOD_J = "INNER JOIN moods ON commits.moodId = moods.moodId";
const DRINK_J = "INNER JOIN drinks ON commits.drinkId = drinks.drinkId";
const USER_J = "INNER JOIN users ON commits.userId = users.userId";
const TEST =
  "SELECT * FROM commits INNER JOIN moods ON commits.moodId = moods.moodId INNER JOIN drinks ON commits.drinkId = drinks.drinkId INNER JOIN users ON commits.userId = users.userId WHERE commits.userId=?";
export async function getAll() {
  return db
    .execute(
      `SELECT * FROM commits ${MOOD_J} ${DRINK_J} ${USER_J} ${ORDER_DESC}`
    )
    .then((result) => {
      return result[0];
    });
}

export async function getAllByUserId(userId) {
  return db
    .execute(
      `SELECT * FROM COMMITS ${MOOD_J} ${DRINK_J} ${USER_J} WHERE commits.userId=?`,
      [userId]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function getById(id) {
  return db
    .execute(
      `SELECT * FROM COMMITS ${MOOD_J} ${DRINK_J} ${USER_J} WHERE commits.commitId=?`,
      [id]
    )
    .then((result) => {
      return result[0][0];
    });
}

export async function getCurrentLength(userId) {
  return commits.filter((x) => x.userId === userId).length;
}

//DB에 접속해서 넣는 것 진행
export async function crete(userId, drinkId, moodId, tagList, memo) {
  const tags = JSON.stringify(tagList);
  return db
    .execute(
      "INSERT INTO commits (userId, drinkId, moodId, tagList, memo, createdAt) VALUES(?,?,?,?,?,?)",
      [userId, drinkId, moodId, tags, memo, new Date()]
    )
    .then((result) => {
      return result[0].insertId;
    });
}

export async function deleteWithId(id) {
  return db.execute("DELETE FROM commits WHERE commitId=?", [id]);
}
