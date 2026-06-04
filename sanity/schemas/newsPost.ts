import { defineField, defineType } from "sanity";

// =================================================================
//  TIN TỨC (News post)
// =================================================================
//  Viết bằng TIẾNG VIỆT. Bản tiếng Anh tự động dịch khi hiển thị.
// =================================================================

export const newsPost = defineType({
  name: "newsPost",
  title: "Tin tức",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề (tiếng Việt)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Ngày đăng",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Nội dung (tiếng Việt)",
      type: "text",
      rows: 4,
    }),
  ],
  orderings: [
    {
      title: "Mới nhất",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
