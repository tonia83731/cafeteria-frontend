export const statusOpts = [
  {
    value: null,
    title: { zh: "全部", en: "All" },
  },
  {
    value: "ongoing",
    title: { zh: "進行中", en: "Ongoing" },
  },
  {
    value: "completed",
    title: { zh: "已完成", en: "Completed" },
  },
  {
    value: "canceled",
    title: { zh: "已取消", en: "Canceled" },
  },
];

export const orderStatus = [
  {
    value: 0,
    title: { zh: "待處理", en: "Pending" },
  },
  {
    value: 1,
    title: { zh: "處理中", en: "Processing" },
  },
  {
    value: 2,
    title: { zh: "配送/取貨中", en: "Delivery/Pickup" },
  },
  {
    value: 3,
    title: { zh: "已完成", en: "Completed" },
  },
  {
    value: 4,
    title: { zh: "已取消", en: "Canceled" },
  },
];

export const shippingOpts = [
  {
    value: 0,
    title: { zh: "自取", en: "Pickup" },
  },
  {
    value: 1,
    title: { zh: "配送", en: "Delivery" },
  },
];

export const paymentOpts = [
  {
    value: 0,
    title: { zh: "現金", en: "Cash" },
  },
  {
    value: 1,
    title: { zh: "現金金融卡/信用卡", en: "Debit/Credit Card" },
  },
];
