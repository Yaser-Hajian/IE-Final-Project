const userNavigation = {
  student: {
    position: "دانشجو",
    menuItems: [{ name: "لیست ترم ها", url: "/dashboard/student/terms" }],
  },
  professor: {
    position: "استاد",
    menuItems: [{ name: "لیست ترم ها", url: "/dashboard/professor/terms" }],
  },
  manager: {
    position: "مدیر",
    menuItems: [
      { name: "لیست ترم ها", url: "/dashboard/manager/terms" },
      { name: "لیست دانشجویان", url: "/dashboard/manager/students" },
      { name: "لیست اساتید", url: "/dashboard/manager/professors" },
    ],
  },
  admin: {
    position: "مدیر It",
    menuItems: [
      { name: "لیست دانشجویان", url: "/dashboard/admin/students" },
      { name: "لیست اساتید", url: "/dashboard/admin/professors" },
      { name: "لیست مدیران", url: "/dashboard/admin/managers" },
      { name: "افزودن دانشکده", url: "/dashboard/admin/college/add" },
    ],
  },
};

export default userNavigation;
