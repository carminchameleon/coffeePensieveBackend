// {
//   userId: String; // 유저 아이디
//   commitId: String; // 커밋 아이디
//   createdAt: Date; // 커밋 생성 날짜
//   order: Number; // 몇번째 커피인지

//   drinkTemp: String; // iced / hot
//   drinkId: String; // 음료 종류
//   drinkName: String; // 음료 이름

//   moodId: String; // 기분 종류
//   moodName: String; // 무드 아이디

//   statusId: [String]; // 상태 종류
//   statusName: [String]; // 상태 이름
//   memo: String; // 메모
// }

import * as drinkRepository from "../data/drinks.js";
import * as tagRepository from "../data/tags.js";
import * as moodRepository from "../data/moods.js";

var commits = [
  {
    userId: "carmen",
    commitId: "carmen0",
    createdAt: Date.now().toString(),
    order: 0,

    drinkId: "1",
    moodId: "1",
    tags: ["1", "4"],
    memo: "오늘의 모닝 커피는 아메리카노",
  },
  {
    userId: "carmen",
    commitId: "carmen1",
    createdAt: Date.now().toString(),
    order: 1,
    drinkId: "1",
    moodId: "2",
    tags: ["1", "3"],
    memo: "나는 얼죽아",
  },
  {
    userId: "lea",
    commitId: "1",
    createdAt: Date.now().toString(),
    order: 0,

    drinkId: "1",
    moodId: "3",
    tags: ["2", "3"],
    memo: "오늘의 모닝 커피는 아메리카노",
  },
];

export async function getAll() {
  return commits;
}

export async function getAllByUserId(userId) {
  return commits.filter((x) => x.userId === userId);
}

export async function getById(id) {
  return commits.find((x) => x.commitId === id);
}

export async function getCurrentLength(userId) {
  return commits.filter((x) => x.userId === userId).length;
}

export async function crete(userId, drinkId, moodId, tagList, memo, order) {
  const newCommit = {
    userId,
    commitId: Date.now().toString(), // DB에서 수정될 예정
    createdAt: Date.now().toString(),
    order,
    drinkId,
    moodId,
    tags: tagList,
    memo,
  };

  commits.push(newCommit);

  return newCommit;
}

export async function deleteWithId(id) {
  const list = commits.filter((x) => x.commitId !== id);
  commits = list;
  return;
}
