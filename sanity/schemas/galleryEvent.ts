import { defineField, defineType } from "sanity";

// =================================================================
//  SỰ KIỆN / HOẠT ĐỘNG (Gallery event)
// =================================================================
//  Viết bằng TIẾNG VIỆT. Ảnh kéo-thả trực tiếp.
//  Nếu điền "Nội dung chi tiết", thẻ sự kiện sẽ bấm vào được và mở
//  trang chi tiết riêng.
// =================================================================

export const galleryEvent = defineType({
  name: "galleryEvent",
  title: "Sự kiện & Hoạt động",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên sự kiện (tiếng Việt)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Ảnh bìa",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Ngày sự kiện",
      description:
        "Dùng để sắp xếp (mới nhất lên đầu) VÀ tự sinh chú thích kiểu 'Tháng 5, 2026' dưới ảnh.",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Nội dung chi tiết (tiếng Việt, không bắt buộc)",
      description:
        "Để trống nếu chỉ muốn hiện ảnh + tên. Nếu điền, thẻ sẽ bấm vào được để mở bài chi tiết.",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Chú thích ảnh",
              type: "string",
            },
          ],
        },
      ],
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
    select: { title: "name", subtitle: "caption", media: "coverImage" },
  },
});
