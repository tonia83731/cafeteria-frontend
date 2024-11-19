export const cartitems_dummy = [
  {
    id: 1,
    cartId: 1,
    product: {
      id: 1,
      categoryId: 1,
      name: "Classic Coffee",
      price: 120,
    },
    quantity: 2,
    size: { id: 2, code: "M", title: { en: "Grande", zh: "中杯" }, price: 10 },
    ice: {
      id: 1,
      code: "100%-ice",
      title: { en: "Regular Ice", zh: "正常冰" },
    },
    sugar: {
      id: 3,
      code: "50%-sugar",
      title: { en: "Half Sugar", zh: "半糖" },
    },
    subPrice: 260, // (base 120 + size 10) * quantity 2
  },
  {
    id: 2,
    cartId: 2,
    product: {
      id: 2,
      categoryId: 1,
      name: "Americano",
      price: 100,
    },
    quantity: 1,
    size: { id: 1, code: "S", title: { en: "Tall", zh: "小杯" }, price: 0 },
    ice: { id: 5, code: "0%-ice", title: { en: "Hot", zh: "熱" } },
    sugar: { id: 5, code: "0%-sugar", title: { en: "Sugar Free", zh: "無糖" } },
    subPrice: 100, // base 100
  },
  {
    id: 3,
    cartId: 3,
    product: {
      id: 3,
      categoryId: 1,
      name: "Latte",
      price: 150,
    },
    quantity: 3,
    size: { id: 3, code: "L", title: { en: "Venti", zh: "大杯" }, price: 15 },
    ice: { id: 2, code: "75%-ice", title: { en: "Less Ice", zh: "少冰" } },
    sugar: {
      id: 1,
      code: "100%-sugar",
      title: { en: "Full Sugar", zh: "全糖" },
    },
    subPrice: 495, // (base 150 + size 15) * quantity 3
  },
  {
    id: 4,
    cartId: 4,
    product: {
      id: 4,
      categoryId: 1,
      name: "Mocha",
      price: 160,
    },
    quantity: 1,
    size: { id: 2, code: "M", title: { en: "Grande", zh: "中杯" }, price: 10 },
    ice: { id: 3, code: "50%-ice", title: { en: "Little Ice", zh: "微冰" } },
    sugar: { id: 2, code: "75%-sugar", title: { en: "75% Sugar", zh: "少糖" } },
    subPrice: 170, // base 160 + size 10
  },
  {
    id: 5,
    cartId: 5,
    product: {
      id: 9,
      categoryId: 2,
      name: "Chocolate Cake",
      price: 220,
    },
    quantity: 2,
    size: null,
    ice: null,
    sugar: null,
    subPrice: 440, // base 220 * quantity 2
  },
  {
    id: 6,
    cartId: 6,
    product: {
      id: 10,
      categoryId: 2,
      name: "Strawberry Cake",
      price: 250,
    },
    quantity: 1,
    size: null,
    ice: null,
    sugar: null,
    subPrice: 250, // base 250
  },
];
