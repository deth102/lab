export type Member = {
  name: string;
  title?: string;          // chức danh — shown as-is (English)
  affiliation: string;
  photo?: string;          // path under public/, e.g. "/members/cuong.jpg"
  contact?: string;         // email or website URL
  scholar?: string;         // Google Scholar / ResearchGate URL — makes card clickable
};

export type MemberGroup = {
  // Available keys: faculty | phd | master | finalyear | year3 | year2 | year1 | alumni
  category: "head" | "faculty" | "phd" | "master" | "finalyear" | "year3" | "year2" | "year1" | "bachelor" | "collaborator" | "alumni";
  members: Member[];
};

// =================================================================
//  HOW TO ADD A MEMBER
// =================================================================
//  Find the right group below, add a member with:
//
//  {
//    name: "Nguyen Van A",
//    title: "Role (optional)",
//    affiliation: "HUST · School of Mechanical Engineering",
//    photo: "/members/a.jpg",        // optional
//    contact: "a@example.com",       // optional (email OR website url)
//    scholar: "https://scholar.google.com/citations?user=XXX", // optional
//  },
//
//  Scholar link makes the whole card clickable.
// =================================================================

const HUST = "HUST · School of Mechanical Engineering";

export const memberGroups: MemberGroup[] = [
  {
    category: "head",
    members: [
      {
        name: "PGS.TS Nguyễn Trọng Du",
        title: "Head of Research Group",
        affiliation: HUST,
        photo: "/members/du.png",
        scholar: "https://scholar.google.com/citations?user=0l-GoPAAAAAJ&hl=en",
      },
    ],
  },
  {
    category: "faculty",
    members: [
      {
        name: "PGS.TS Nguyễn Phong Điền",
        title: "Senior Advisor",
        affiliation: HUST,
        photo: "/members/dien.jpg",
        scholar: "https://scholar.google.com/citations?user=0KhWZ04AAAAJ&hl=en",
      },
      {
        name: "TS. Trương Quốc Chiến",
        title: "Key Member",
        affiliation: HUST,
        photo: "/members/chien.jpg",
        scholar: "https://scholar.google.com/citations?user=P9yPJnsAAAAJ&hl=en",
      },
      {
        name: "TS. Nguyễn Thái Minh Tuấn",
        title: "Key Member",
        affiliation: HUST,
        photo: "/members/minhtuan.png",
        scholar: "https://scholar.google.com/citations?user=D0LOGkcAAAAJ&hl=en",
      },
      {
        name: "TS. Nguyễn Thị Vân Hương",
        title: "Key Member",
        affiliation: HUST,
        photo: "/members/vanhuong.jpg",
        scholar: "https://scholar.google.com/citations?user=EeTxfr4AAAAJ&hl=en",
      },
      {
        name: "TS. Nguyễn Hải Sơn",
        title: "Key Member",
        affiliation: HUST,
        photo: "/members/haison.jpeg",
        scholar: "https://scholar.google.com/citations?user=lSbY-IUAAAAJ&hl=en",
      },
    ],
  },
    {
    category: "collaborator",
    members: [
      { name: "PGS.TS. Nguyễn Thị Thanh Nga", affiliation: "", title: "Collaborator", photo: "/members/nga.jpg"},
      { name: "TS. Bùi Quang Thành",           affiliation: "", title: "Collaborator", photo: "/members/thanh.jpg" },
      { name: "Assoc. Prof. Nguyen Thi Phuong Khanh", affiliation: "", title: "Collaborator", photo: "/members/khanh.jpg" },
      { name: "Prof. Jin-Wei Liang",            affiliation: "", title: "Collaborator", photo: "/members/liang.jpg" },
      { name: "Prof. Shyn-Chin Huang",          affiliation: "", title: "Collaborator", photo: "/members/huang.jpg" },
      { name: "Prof. Dao Viet Dzung",           affiliation: "", title: "Collaborator", photo: "/members/dzung.jpg" },
      { name: "Prof. Dao Ba Phong",             affiliation: "", title: "Collaborator", photo: "/members/phong.jpg" },
      { name: "TS. Nguyễn Thanh Hải",           affiliation: "", title: "Collaborator", photo: "/members/thanhhai.png" },
      { name: "TS. Trần Thị Mai",               affiliation: "", title: "Collaborator", photo: "/members/thimai.jpg" },
    ],
  },
  {
    category: "phd",
    members: [
      {
        name: "Ths. Nguyễn Văn Quyền",
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
    category: "finalyear",
    members: [
      { name: "Hoàng Văn Anh", affiliation: HUST, title: "ITD10 Member" },
      { name: "Lê Mạnh Tuấn", affiliation: HUST, title: "ITD10 Leader" },
      { name: "Lê Công Hiếu", affiliation: HUST, title: "ITD03 Member" },
    ],
  },
  {
    category: "year3",
    members: [
      { name: "Đinh Đức Minh", affiliation: HUST, title: "ITD10 Member" },
      { name: "Bùi Minh Đức", affiliation: HUST, title: "ITD06 Member", photo: "/members/duc.jpg" },
    ],
  },
  {
    category: "year2",
    members: [
      { name: "Trần Chí Độ", affiliation: HUST, title: "ITD01 Member", photo: "/members/mixi.jpg" },
      { name: "Trương Văn Hiệp", affiliation: HUST, title: "ITD01 Member" },
      { name: "Bùi Minh Thắng", affiliation: HUST, title: "ITD04 Member" },
      { name: "Nguyễn Đình Bách", affiliation: HUST, title: "ITD06 Member", photo: "/members/dinhbach.jpg" },
      { name: "Nguyễn Công Minh", affiliation: HUST, title: "ITD04 Leader" },
      { name: "Lê Đức Dương", affiliation: HUST, title: "ITD07 Member" },
      { name: "Nguyễn Văn Tuấn", affiliation: HUST, title: "ITD05 Member", photo: "/members/vantuan.jpg" },
      { name: "Trần Thanh Lâm", affiliation: HUST },
    ],
  },
  {
    category: "year1",
    members: [
      { name: "Phan Phú Bình", affiliation: HUST, title: "ITD05 Member", photo: "/members/teo.jpg" },
      { name: "Nhật Hùng", affiliation: HUST, title: "ITD02 Member", photo: "/members/nhathung.jpg" },
      { name: "Vũ Kỳ", affiliation: HUST, title: "ITD08 Member", photo: "/members/ky.jpg" },
      { name: "Phạm Khôi Nguyên", affiliation: HUST, title: "ITD03 Member" },
      { name: "Huy Trung", affiliation: HUST, title: "ITD04 Member" },
    ],
  },
];
