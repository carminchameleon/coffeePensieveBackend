import * as commitRepository from "../data/commits.js";
import * as drinkRepository from "../data/drinks.js";

import * as moodRepository from "../data/moods.js";
import * as tagRepository from "../data/tags.js";

//컨트롤러에서는 정말 중요한 모델과 관련된 로직
// 유효성 검사에 대해서는 router 쪽에서만 하고 싶다면?

export async function postCommit(req, res) {
  const { drinkId, moodId, tagList, memo } = req.body;
  // 로그인을 할 때 userId를 받을 수 있음
  const userId = req.userId;
  const userCommitLength = await commitRepository.getCurrentLength(userId);

  let isExistUser = true;

  if (!isExistUser) {
    res.status(404).json({ message: "user is not exist" });
  } else {
    const commit = await commitRepository.crete(
      userId,
      drinkId,
      moodId,
      tagList,
      memo,
      userCommitLength
    );

    res.status(201).json(commit);
  }
}

export async function getCommitWithId(req, res) {
  const id = req.params.id;
  const drink = await commitRepository.getById(id);

  const { userId, commitId, createdAt, order, drinkId, moodId, tags, memo } =
    drink;
  const currentDrink = await drinkRepository.getById(drinkId);
  const mood = await moodRepository.getById(moodId);
  const tagList = await tagRepository.getAll();

  const myTags = tags.map((x) => tagList.find((y) => y.tagId === x));

  const commit = {
    userId,
    commitId,
    createdAt,
    order,
    memo,
    tags: myTags,
    mood,
    drink: currentDrink,
  };

  if (commit) {
    res.status(200).json(commit);
  } else {
    res.status(404).json({ message: `commit id ${req.params.id} not found` });
  }
}

export async function deleteCommit(req, res) {
  const userId = req.userId;
  const id = req.params.id;

  const commit = await commitRepository.getById(req.params.id);
  if (!commit) {
    return res.status(404).json({ message: "Not exist" });
  }

  if (commit.userId !== userId) {
    return res.sendStatus(403);
  }

  await commitRepository.deleteWithId(id);
  res.sendStatus(204);
}

// commits 전체 혹은 userId
export async function getCommit(req, res) {
  const userId = req.query.userId;

  const data = await (userId
    ? commitRepository.getAllByUserId(userId)
    : commitRepository.getAll());

  const drinks = await drinkRepository.getAll();
  const moods = await moodRepository.getAll();
  const tagList = await tagRepository.getAll();

  const myData = data.map((x) => {
    const { userId, commitId, createdAt, order, memo, tags } = x;
    const mood = moods.find((mood) => mood.moodId === x.moodId);
    const drink = drinks.find((drink) => drink.drinkId === x.drinkId);
    const myTags = tags.map((x) => tagList.find((y) => y.tagId === x));

    return {
      userId,
      commitId,
      createdAt,
      order,
      memo,
      drink,
      mood,
      tag: myTags,
    };
  });

  res.status(200).json(myData);
}
