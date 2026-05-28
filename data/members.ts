export type Member = {
  name: string;
  title?: string;          // chức danh (Lab Director, PhD student, Master's researcher…)
  affiliation: string;    // đơn vị công tác (HUST · School of Mechanical Engineering…)
  photo?: string;          // optional path under public/, e.g. "/members/cuong.jpg"
  contact?: string;         // optional (email or website URL)
};

export type MemberGroup = {
  // Used as the section heading via the "Members.categories.<key>" translation key.
  // Available keys: faculty | phd | master | bachelor | alumni
  category: "faculty" | "phd" | "master" | "bachelor" | "alumni";
  members: Member[];
};

// =================================================================
//  HOW TO ADD A MEMBER
// =================================================================
//  Find the right group below (or copy a whole group block if you
//  want to enable one that's currently empty). Add a member with:
//
//  {
//    name: "Nguyen Van A",
//    title: "PhD student",
//    affiliation: "HUST · School of Mechanical Engineering",
//    contact: "a@example.com",   // optional (email OR website url)
//  },
//
//  Empty groups display a small "open seats" hint instead of being
//  hidden — delete the group entirely if you don't want it shown.
// =================================================================

const HUST = "HUST · School of Mechanical Engineering";

export const memberGroups: MemberGroup[] = [
  {
    category: "faculty",
    members: [
      {
        name: "Nguyễn Trọng Du",
        title: "Lab Director",
        affiliation: HUST,
      },
      {
        name: "Trương Quốc Chiến",
        title: "",
        affiliation: HUST,
      },
    ],
  },
  {
    category: "phd",
    members: [
      {
        name: "Nguyễn Văn Quyền",
        affiliation: HUST,
      },
      {
        name: "Vũ Trần Chính",
        affiliation: HUST,
      },
      {
        name: "Nguyễn Hữu Cương",
        affiliation: "Griffith University, Australia",
      },
      {
        name: "Lê Phúc Tân",
        affiliation: HUST,
        photo: "/members/tan.jpg",
      },
    ],
  },
  {
    category: "master",
    members: [
      {
        name: "Nguyễn Khánh Dư",
        affiliation: HUST,
      },
      {
        name: "Hoàng Nhân Phúc",
        affiliation: HUST,
      },
      {
        name: "Phạm Thái Hưng",
        affiliation: HUST,
        photo: "/members/hung.jpg",
      },
      {
        name: "Phạm Thành Trung",
        affiliation: "MCUT · Ming Chi University of Technology",
      },
      {
        name: "Nguyễn Quang Huy",
        affiliation: HUST,
        photo: "/members/huy.jpg",
      },
      {
        name: "Phạm Tuấn Đông",
        affiliation: "MCUT · Ming Chi University of Technology",
        photo: "/members/dong.jpg",
      },
      {
        name: "Đỗ Danh Thanh Bình",
        affiliation: HUST,
        photo: "/members/binh.jpg",
      },
      {
        name: "Nguyễn Mạnh Cường",
        affiliation: "NCU · National Central University",
        photo: "/members/cuong.JPG",
        contact: "cuongnm.com",
      },
    ],
  },
  {
    category: "bachelor",
    members: [
      { name: "Hoàng Văn Anh", affiliation: HUST },
      { name: "Mạnh Tuấn", affiliation: HUST },
      { name: "Lê Công Hiếu", affiliation: HUST },
      { name: "Ngô Lâm", affiliation: HUST },
      { name: "Bùi Minh Đức", affiliation: HUST, 
        photo: "/members/duc.jpg",
      },
      { name: "Trần Chí Độ", affiliation: HUST },
      { name: "Trương Văn Hiệp", affiliation: HUST },
      { name: "Bùi Minh Thắng", affiliation: HUST },
      { name: "Đình Bách", affiliation: HUST },
      { name: "Nguyễn Công Minh", affiliation: HUST },
      { name: "Nhật Hùng", affiliation: HUST,photo: "/members/nhathung.jpg" },
      { name: "Vũ Kỳ", affiliation: HUST, photo: "/members/ky.jpg" },
      { name: "Khôi Nguyên", affiliation: HUST },
      { name: "Huy Trung", affiliation: HUST },
      { name: "Phan Phú Bình", affiliation: HUST, photo: "/members/binh.jpg" },
    ],
  },
];
