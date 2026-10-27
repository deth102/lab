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
  category: "head" | "faculty" | "phd" | "master" | "finalyear" | "year3" | "year2" | "year1" | "bachelor" | "Scientific Advisory Board" | "alumni";
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
        name: "TS. Đỗ Đức Nam",
        title: "Key Member",
        affiliation: HUST,
        photo: "/members/ducnam.jpg",
        
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
        scholar: "https://scholar.google.com/citations?user=dWFLO24AAAAJ&hl=en",
      },
    ],
  },
    {
    category: "Scientific Advisory Board",
    members: [
      { name: "PGS.TS. Nguyễn Thị Thanh Nga", 
        affiliation: "TNUT, VietNam", 
        title: "Scientific Advisory Board", 
        photo: "/members/nga.jpg",
        scholar: "https://scholar.google.com/citations?user=sxTye78AAAAJ&hl=vi"
      },
      { name: "TS. Bùi Quang Thành",           
        affiliation: "USTH, VietNam", 
        title: "Scientific Advisory Board", 
        photo: "/members/thanh.jpg",
        scholar: "https://scholar.google.com/citations?user=j6NhmNMAAAAJ&hl=en" 
      },
      { name: "Prof. Nguyen Thi Phuong Khanh", 
        affiliation: "UTTOP, France", 
        title: "Scientific Advisory Board", 
        photo: "/members/khanh.jpg", 
        scholar: "https://scholar.google.com/citations?user=cN9HRaQAAAAJ&hl=fr" 
      },
      { name: "Prof. Jin-Wei Liang",            
        affiliation: "Ming Chi University of Technology, Taiwan",
        title: "Scientific Advisory Board", 
        photo: "/members/liang.jpg",
        scholar: "https://scholar.google.com/citations?user=dPg9X9IAAAAJ&hl=en"
      },
      { name: "Prof. Shyn-Chin Huang",          
        affiliation: "Ming Chi University of Technology, Taiwan",
        title: "Scientific Advisory Board", 
        photo: "/members/huang.jpg",
        scholar: "https://www.researchgate.net/profile/Shyh-Chin-Huang-2" 
      },
      { name: "Prof. Dao Viet Dzung",           
        affiliation: "Griffith University, Australia", 
        title: "Scientific Advisory Board", 
        photo: "/members/dzung.jpg",
        scholar: "https://scholar.google.com.vn/citations?user=Eqwg9BcAAAAJ&hl=vi" 
      },
      { name: "Prof. Dao Ba Phong",             
        affiliation: "AGH University of Krakow, Poland", 
        title: "Scientific Advisory Board", 
        photo: "/members/phong.jpg",
        scholar: "https://scholar.google.com/citations?user=dvTVPJ0AAAAJ&hl=en" 
      },
      { name: "TS. Nguyễn Thanh Hải",           
        affiliation: "SamSung", 
        title: "Scientific Advisory Board", 
        photo: "/members/thanhhai.png" 
      },
      { name: "TS. Trần Thị Mai",               
        affiliation: "VinUniversity, VietNam", 
        title: "Scientific Advisory Board", 
        photo: "/members/thimai.jpg",
        scholar: "https://scholar.google.com/citations?user=6S5gbIAAAAAJ&hl=en" 
      },
      { name: "ThS. Nguyễn Phương Hùng",               
        affiliation: "", 
        title: "Scientific Advisory Board", 
        photo: "/members/phuonghung.jpg" 
      },
    ],
  },
  {
    category: "phd",
    members: [
      {
        name: "Ths. Nguyễn Văn Quyền",
        affiliation: HUST,
        photo: "/members/quyen.jpg",
        scholar: "https://orcid.org/0000-0001-9486-1431",
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
        name: "Nguyễn Khánh Dư",
        title: "ITD07 Member",
        photo: "/members/khanhdu.jpg",
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
        scholar: "https://www.researchgate.net/profile/Cuong-Nguyen-343",
      },
      {
        name: "Nguyễn Mạnh Khang",
        affiliation: HUST,
        photo: "/members/khang.jpg",
      },
    ],
  },

  {
    category: "finalyear",
    members: [
      { name: "Hoàng Văn Anh", affiliation: HUST, title: "ITD10 Member",photo: "/members/vananh.jpg" },
      { name: "Lê Mạnh Tuấn", affiliation: HUST, title: "ITD10 Leader", photo: "/members/manhtuan.jpg" },
      { name: "Lê Công Hiếu", affiliation: HUST, title: "ITD03 Member",photo: "/members/conghieu.jpg" },
    ],
  },
  {
    category: "year3",
    members: [
      { name: "Đinh Đức Minh", affiliation: HUST, title: "ITD10 Member", photo: "/members/ducminh.jpg" },
      { name: "Bùi Minh Đức", affiliation: HUST, title: "ITD06 Member", photo: "/members/duc.jpg" },
    ],
  },
  {
    category: "year2",
    members: [
      { name: "Trần Chí Độ", affiliation: HUST, title: "ITD01 Member", photo: "/members/mixi.jpg" },
      { name: "Trương Văn Hiệp", affiliation: HUST, title: "ITD01 Member", photo: "/members/hiep.jpg" },
      { name: "Bùi Minh Thắng", affiliation: HUST, title: "ITD04 Member", photo: "/members/thang.jpg" },
      { name: "Nguyễn Đình Bách", affiliation: HUST, title: "ITD06 Member", photo: "/members/dinhbach.jpg" },
      { name: "Nguyễn Công Minh", affiliation: HUST, title: "ITD04 Leader",photo: "/members/congminh.jpg" },
      { name: "Lê Đức Dương", affiliation: HUST, title: "ITD07 Member", photo: "/members/duong.jpg" },
      { name: "Nguyễn Văn Tuấn", affiliation: HUST, title: "ITD05 Member", photo: "/members/vantuan.jpg" },
      { name: "Trần Thanh Lâm", affiliation: HUST, photo: "/members/lam.jpg"},
    ],
  },
  {
    category: "year1",
    members: [
      { name: "Phan Phú Bình", affiliation: HUST, title: "ITD05 Member", photo: "/members/teo.jpg" },
      { name: "Trần Đăng Nhật Hùng", affiliation: HUST, title: "ITD02 Member", photo: "/members/nhathung.jpg" },
      { name: "Vũ Kỳ", affiliation: HUST, title: "ITD08 Member", photo: "/members/ky.jpg" },
      { name: "Phạm Khôi Nguyên", affiliation: HUST, title: "ITD03 Member", photo: "/members/khoinguyen.jpg" },
      { name: "Huy Trung", affiliation: HUST, title: "ITD04 Member",photo: "/members/huytrung.jpg" },
    ],
  },
];
