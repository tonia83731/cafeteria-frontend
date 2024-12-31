export const status_options = [
  {
    id: "all",
    title: {
      zh: "全部",
      en: "All",
    },
    include: [],
  },
  {
    id: "ongoing",
    title: {
      zh: "進行中",
      en: "On-Going",
    },
    include: ["pending", "preparing", "delivering", "picking up"],
  },
  {
    id: "completed",
    title: {
      zh: "已完成",
      en: "Completed",
    },
    include: ["completed"],
  },
  {
    id: "canceled",
    title: {
      zh: "已取消",
      en: "Canceled",
    },
    include: ["canceled"],
  },
];
