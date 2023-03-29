const moods = [
  {
    moodId: "1",
    moodName: "happy",
    emoji: "😊",
  },
  {
    moodId: "2",
    moodName: "excited",
    emoji: "😆",
  },
  {
    moodId: "3",
    moodName: "grateful",
    emoji: "🥰",
  },
  {
    moodId: "4",
    moodName: "relaxed",
    emoji: "😌",
  },
  {
    moodId: "5",
    moodName: "tired",
    emoji: "🥱",
  },
  {
    moodId: "6",
    moodName: "anxious",
    emoji: "🙄",
  },
  {
    moodId: "7",
    moodName: "angry",
    emoji: "😠",
  },
  {
    moodId: "8",
    moodName: "stressed",
    emoji: "🤯",
  },
  {
    moodId: "9",
    moodName: "sad",
    emoji: "😭",
  },
];

export async function getAll() {
  return moods;
}

export async function getById(id) {
  return moods.find((x) => x.moodId === id);
}
