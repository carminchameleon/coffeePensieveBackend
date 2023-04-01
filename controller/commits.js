import * as commitRepository from "../data/commits.js";
import * as tagRepository from "../data/tags.js";

export async function postCommit(req, res) {
  const { drinkId, moodId, tagList, memo } = req.body;
  // 로그인을 할 때 userId를 받을 수 있음

  const userId = req.userId;

  if (!userId) {
    res.status(404).json({ message: "user is not exist" });
  } else {
    const commit = await commitRepository.crete(
      userId,
      drinkId,
      moodId,
      tagList,
      memo
    );

    res.status(201).json(commit);
  }
}

// commits 전체 혹은 userId
export async function getCommit(req, res) {
  const userId = req.query.userId;

  const data = await (userId
    ? commitRepository.getAllByUserId(userId)
    : commitRepository.getAll());

  const tagData = await tagRepository.getAll();

  const myData = data.map((x) => {
    const {
      userId,
      commitId,
      createdAt,
      memo,
      drinkId,
      drinkName,
      drinkImage,
      isIced,
      moodName,
      emoji,
      username,
      url,
      tagList,
    } = x;

    const tagInfo = tagList.map((x) => {
      return tagData.find((y) => y.tagId === Number(x));
    });

    return {
      commitId,
      createdAt,
      user: {
        username,
        userId,
        url,
      },

      drink: {
        drinkId,
        isIced,
        drinkName,
        drinkImage,
      },
      mood: {
        moodName,
        emoji,
      },

      tagList: tagInfo,
      memo,
    };
  });

  res.status(200).json(myData);
}

// commit id로 가져오기
export async function getCommitWithId(req, res) {
  const id = req.params.id;

  const drink = await commitRepository.getById(id);
  const tagData = await tagRepository.getAll();

  if (!drink) {
    return res
      .status(404)
      .json({ message: `commit id ${req.params.id} not found` });
  }

  const {
    userId,
    commitId,
    createdAt,
    memo,
    drinkId,
    drinkName,
    drinkImage,
    isIced,
    moodName,
    emoji,
    username,
    url,
    tagList,
  } = drink;

  const myTags = tagList.map((x) => tagData.find((y) => y.tagId === Number(x)));

  const commit = {
    commitId,
    createdAt,
    user: {
      username,
      userId,
      url,
    },

    drink: {
      drinkId,
      isIced,
      drinkName,
      drinkImage,
    },
    mood: {
      moodName,
      emoji,
    },

    tagList: myTags,
    memo,
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
