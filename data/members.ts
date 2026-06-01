export type Member = {
  name: string;
  title?: string;          // chức danh (Lab Director, PhD student, Master's researcher…)
  affiliation: string;    // đơn vị công tác (HUST · School of Mechanical Engineering…)
  photo?: string;          // optional path under public/, e.g. "/members/cuong.jpg"
  contact?: string;         // optional (email or website URL)
  scholar?: string;         // optional Google Scholar profile URL — when set,
                            //   the whole card opens this URL in a new tab.
                            //   Find it at: scholar.google.com/citations?user=<ID>
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
        name: "PGS.TS Nguyễn Trọng Du",
        title: "Lab Director",
        affiliation: HUST,
        photo: "/members/du.jpg",
        scholar: "https://scholar.google.com/citations?user=0l-GoPAAAAAJ&hl=en",
      },
      {
        name: "PGS.TS Nguyễn Phong Điền",
        title: "Lab Director",
        affiliation: HUST,
        photo: "/members/dien.jpg",
        scholar: "https://scholar.google.com/citations?user=0KhWZ04AAAAJ&hl=en",
      },
      {
        name: "TS. Trương Quốc Chiến",
        title: "",
        affiliation: HUST,
        photo: "/members/chien.jpg",
        scholar: "https://scholar.google.com/citations?user=P9yPJnsAAAAJ&hl=en",
      },
      {
        name: "TS. Nguyễn Thái Minh Tuấn",
        title: "",
        affiliation: HUST,
        photo: "/members/minhtuan.png",
        scholar: "https://scholar.google.com/citations?user=D0LOGkcAAAAJ&hl=en",
      },
      {
        name: "TS. Nguyễn Thị Vân Hương",
        title: "",
        affiliation: HUST,
        photo: "/members/vanhuong.jpg",
        scholar: "https://scholar.google.com/citations?user=EeTxfr4AAAAJ&hl=en",
      },
      {
        name: "TS. Nguyễn Hải Sơn",
        title: "",
        affiliation: HUST,
        photo: "/members/haison.jpeg",
        scholar: "https://scholar.google.com/citations?user=lSbY-IUAAAAJ&hl=en",
      },


    ],
  },
  {
    category: "phd",
    members: [
      {
        name: "Ths.Nguyễn Văn Quyền",
        affiliation: HUST,
        photo: "/members/quyen.jpg",
      },
      {
        name: "Ths. Vũ Trần Chính",
        affiliation: HUST,
        photo: "/members/chinh.jpg",
      },
      {
        name: "Ths. Nguyễn Hữu Cương",
        affiliation: "Griffith University, Australia",
        photo: "/members/huucuong.png",
        title: "ITD08 Leader",
        scholar: "https://scholar.google.com/citations?user=tKCuv1gAAAAJ&hl=en",
      },
      {
        name: "Ths. Lê Phúc Tân",
        affiliation: HUST,
        title: "ITD07 Leader",
        photo: "/members/tan.jpg",
      },
    ],
  },
  {
    category: "master",
    members: [
      {
        name: "Ths. Nguyễn Khánh Dư",
        title: "ITD07 Member",
        affiliation: HUST,
      },
      {
        name: "Hoàng Nhân Phúc",
        title: "ITD05 Leader",
        photo: "/members/phuc.jpg",
        affiliation: HUST,
      },
      {
        name: "Phạm Thái Hưng",
        title: "ITD01 Leader",
        affiliation: HUST,
        photo: "/members/hung.jpg",
        scholar: "https://www.researchgate.net/scientific-contributions/Thai-Hung-Pham-2314575101",
      },
      {
        name: "Phạm Thành Trung",
        title: "ITD09 Leader",
        affiliation: "MCUT · Ming Chi University of Technology",
        photo: "/members/trung.jpg",
        scholar: "https://scholar.google.com/citations?user=5KQVCpAAAAAJ&hl=en",
      },
      {
        name: "Nguyễn Quang Huy",
        affiliation: HUST,
        title: "ITD03 Leader",
        photo: "/members/huy.jpg",
      },
      {
        name: "Phạm Tuấn Đông",
        title: "ITD09 Member",
        affiliation: "MCUT · Ming Chi University of Technology",
        photo: "/members/dong.jpg",
        scholar: "https://www.researchgate.net/scientific-contributions/Tuan-Dong-Pham-2330511574",
      },
      {
        name: "Đỗ Danh Thanh Bình",
        affiliation: HUST,
        title: "ITD02 Leader",
        photo: "/members/binh.jpg",
        scholar: "https://www.researchgate.net/scientific-contributions/Danh-Thanh-Binh-Do-2314567615",
      },
      {
        name: "Nguyễn Mạnh Cường",
        affiliation: "NCU · National Central University",
        title: "ITD06 Leader",
        photo: "/members/cuong.JPG",
        contact: "cuongnm.com",
      },
    ],
  },
  {
    category: "bachelor",
    members: [
      { name: "Hoàng Văn Anh", affiliation: HUST, title: "ITD10 Member" },
      { name: "Lê Mạnh Tuấn", affiliation: HUST, title: "ITD10 Leader"},
      { name: "Lê Công Hiếu", affiliation: HUST,title: "ITD03 Member" },
      { name: "Bùi Minh Đức", affiliation: HUST,title: "ITD06 Member",photo: "/members/duc.jpg",},
      { name: "Trần Chí Độ", affiliation: HUST,title: "ITD01 Member", photo: "/members/mixi.jpg" },
      { name: "Trương Văn Hiệp", affiliation: HUST,title: "ITD01 Member" },
      { name: "Bùi Minh Thắng", affiliation: HUST,title:"ITD04 Member" },
      { name: "Đình Bách", affiliation: HUST, title: "ITD06 Member", photo: "/members/dinhbach.jpg" },
      { name: "Nguyễn Công Minh", affiliation: HUST, title: "ITD04 Leader" },
      { name: "Nhật Hùng", affiliation: HUST, title: "ITD02 Member", photo: "/members/nhathung.jpg" },
      { name: "Vũ Kỳ", affiliation: HUST, title: "ITD08 Member", photo: "/members/ky.jpg" },
      { name: "Khôi Nguyên", affiliation: HUST, title:"ITD03 Member" },
      { name: "Huy Trung", affiliation: HUST, title: "ITD04 Member" },
      { name: "Phan Phú Bình", affiliation: HUST, photo: "/members/teo.jpg", title: "ITD05 Member" },
      { name: "Nguyễn Văn Tuấn", affiliation: HUST, photo: "/members/vantuan.jpg", title: "ITD05 Member" },
      { name: "Lê Đức Dương", affiliation: HUST,  title: "ITD07 Member" },
    ],
  },
];
