import { db } from "../db/database.js";
let users = [
  {
    userId: "0",
    username: "carmen@gmail.com",
    password: "$2b$12$cQxdDfFmLUspjvByiJAXo.mqAXHLG5826B7loLYF51vFsMCFeED.G",
    nickname: "carminido",
    url: "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
    wakeUpTime: "07:00",
    bedTime: "08:00",
    limitCups: 3,
    limitTime: "14:00",
    wakeUpReminder: true,
    bedTimeReminder: true,
    limitReminder: true,
  },
];

export async function findByUsername(username) {
  //모든 항목을 가져올건데 username이 같은걸 가져올거야
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => {
      return result[0][0];
    });
}

export async function findById(userId) {
  return db
    .execute("SELECT * FROM users WHERE userId=?", [userId])
    .then((result) => {
      return result[0][0];
    });
}

export async function createUser(user) {
  const {
    username,
    password,
    nickname,
    url,
    wakeUpTime,
    bedTime,
    limitCups,
    limitTime,
    wakeUpReminder,
    bedTimeReminder,
    limitReminder,
  } = user;
  return db
    .execute(
      "INSERT INTO users (username, password, nickname, url, wakeUpTime, bedTime, limitCups, limitTime, wakeUpReminder, bedTimeReminder,limitReminder) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        username,
        password,
        nickname,
        url,
        wakeUpTime,
        bedTime,
        limitCups,
        limitTime,
        wakeUpReminder,
        bedTimeReminder,
        limitReminder,
      ]
    )
    .then((result) => {
      return result[0].insertId;
    });
  // const created = { ...user, userId: Date.now().toString() };
  // users.push(created);
  // return created.userId;
}
