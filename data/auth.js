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
  return users.find((x) => x.username === username);
}

export async function findById(userId) {
  return users.find((x) => x.userId === userId);
}

export async function createUser(user) {
  const created = { ...user, userId: Date.now().toString() };
  users.push(created);
  return created.userId;
}
