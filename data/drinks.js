const drinks = [
  {
    drinkId: "1",
    isIced: false,
    drinkName: "americano",
    drinkImage: "",
    drinkOrder: 1,
  },
  {
    drinkId: "2",
    isIced: true,
    drinkName: "americano(I)",
    drinkImage: "",
    drinkOrder: 1,
  },
  {
    drinkId: "3",
    isIced: false,
    drinkName: "latte",
    drinkImage: "",
    drinkOrder: 2,
  },
  {
    drinkId: "4",
    isIced: true,
    drinkName: "latte(I)",
    drinkImage: "",
    drinkOrder: 2,
  },
  {
    drinkId: "5",
    isIced: false,
    drinkName: "cappuccino",
    drinkImage: "",
    drinkOrder: 3,
  },
  {
    drinkId: "6",
    isIced: false,
    drinkName: "flat white",
    drinkImage: "",
    drinkOrder: 4,
  },
  {
    drinkId: "7",
    isIced: true,
    drinkName: "mocha(I)",
    drinkImage: "",
    drinkOrder: 5,
  },
  {
    drinkId: "8",
    isIced: false,
    drinkName: "mocha",
    drinkImage: "",
    drinkOrder: 5,
  },
  {
    drinkId: "9",
    isIced: false,
    drinkName: "filter",
    drinkImage: "",
    drinkOrder: 6,
  },
  {
    drinkId: "10",
    isIced: false,
    drinkName: "espresso",
    drinkImage: "",
    drinkOrder: 7,
  },
  {
    drinkId: "11",
    isIced: false,
    drinkName: "macchiato",
    drinkImage: "",
    drinkOrder: 8,
  },
  {
    drinkId: "12",
    isIced: true,
    drinkName: "cold brew",
    drinkImage: "",
    drinkOrder: 9,
  },
];

export async function getAll() {
  return drinks;
}

export async function getById(id) {
  return drinks.find((x) => x.drinkId === id);
}

export async function getIced() {
  return drinks.filter((x) => x.isIced === true);
}

export async function getHot() {
  return drinks.filter((x) => x.isIced === false);
}
