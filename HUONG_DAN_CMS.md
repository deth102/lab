# Hướng dẫn đăng tin & ảnh không cần code (Sanity CMS)

Trang web đã được tích hợp **Sanity CMS**. Sau khi cài đặt 1 lần, thầy/cô
và admin có thể đăng tin tức + sự kiện qua giao diện web, **không cần sửa
code, không cần git, không cần build lại**.

> **Trạng thái hiện tại:** code đã sẵn sàng. Web vẫn chạy bình thường bằng
> dữ liệu trong `data/news.ts` và `data/gallery.ts` cho tới khi bạn hoàn
> tất phần "Cài đặt lần đầu" bên dưới. Khi Sanity đã có dữ liệu, web tự
> ưu tiên lấy từ Sanity.

---

## PHẦN 1 — CÀI ĐẶT LẦN ĐẦU (chỉ làm 1 lần, ~10 phút)

### Bước 1: Tạo project Sanity (miễn phí)

1. Vào **https://www.sanity.io/** → bấm **Get started** → đăng nhập bằng
   Google (nên dùng email chính của lab).
2. Tạo project mới:
   - Project name: `ITD Lab`
   - Dataset: để mặc định **`production`**
3. Sau khi tạo xong, vào **Project settings** (biểu tượng bánh răng) →
   mục **General**. Copy lại **Project ID** (chuỗi kiểu `a1b2c3d4`).

### Bước 2: Dán Project ID vào web

**Khi chạy ở máy (local):** tạo file tên `.env.local` ở thư mục gốc của
web (`d:\web\lab\.env.local`) với nội dung:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=dán_project_id_vào_đây
NEXT_PUBLIC_SANITY_DATASET=production
```

**Trên Vercel (web thật):** vào Vercel → project **lab** → **Settings** →
**Environment Variables** → thêm 2 biến giống hệt:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | project id của bạn |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

Sau đó **Redeploy** (Deployments → bấm ⋯ → Redeploy).

### Bước 3: Cho phép web truy cập Studio (CORS)

1. Vào Sanity → **Project settings** → **API** → mục **CORS Origins**.
2. Bấm **Add CORS origin**, thêm 2 dòng (mỗi dòng bấm Add 1 lần):
   - `http://localhost:3001` — tick **Allow credentials**
   - `https://itdhust.com` — tick **Allow credentials**
   - (nếu dùng tên miền vercel `*.vercel.app` thì thêm cả dòng đó)

### Bước 4: Mời thầy/cô + admin vào đăng tin

1. Vào Sanity → project → tab **Members** (hoặc **Invite**).
2. Mời bằng email. Vai trò:
   - **Editor** = đăng/sửa tin (phù hợp cho thầy/cô + admin).
   - **Administrator** = thêm quyền quản lý (cho 1 người chính).
3. Người được mời nhận email → bấm chấp nhận → xong.

> Free tier cho **3 người dùng**. Đủ cho thầy + 1-2 admin.

---

## PHẦN 2 — CÁCH ĐĂNG TIN HẰNG NGÀY (sau khi đã cài đặt)

### Mở trang quản lý

Vào **https://itdhust.com/studio** (hoặc `http://localhost:3001/studio`
khi chạy ở máy) → đăng nhập.

Bên trái có 2 mục: **Tin tức** và **Sự kiện & Hoạt động**.

### Đăng một tin tức mới

1. Bấm **Tin tức** → bấm nút **+** (hoặc "Create new").
2. Điền:
   - **Tiêu đề (tiếng Việt)** — viết tiếng Việt bình thường.
   - **Ngày đăng** — chọn ngày.
   - **Nội dung (tiếng Việt)** — nội dung chi tiết (có thể để trống).
3. Bấm **Publish** (góc dưới phải).
4. Mở web → tin xuất hiện trong vòng ~1 phút. **Bản tiếng Anh tự dịch.**

### Đăng một sự kiện / hoạt động (có ảnh)

1. Bấm **Sự kiện & Hoạt động** → bấm **+**.
2. Điền:
   - **Tên sự kiện (tiếng Việt)**.
   - **Ảnh bìa** — kéo-thả ảnh vào, hoặc bấm để chọn file.
   - **Chú thích** — ví dụ `Hà Nội · Tháng 5/2026` (không bắt buộc).
   - **Ngày** — để sắp xếp (sự kiện mới nhất lên đầu).
   - **Nội dung chi tiết** — *để trống* nếu chỉ muốn hiện ảnh + tên.
     Nếu điền (gõ chữ, chèn thêm ảnh), thẻ sự kiện sẽ **bấm vào được**
     để mở trang bài viết chi tiết (giống một bài báo).
3. Bấm **Publish**.

> Chèn ảnh giữa bài: trong ô "Nội dung chi tiết", bấm icon ảnh trên thanh
> công cụ để chèn. Mỗi ảnh có thể thêm chú thích riêng.

### Sửa / xoá

- **Sửa:** bấm vào tin/sự kiện trong danh sách → sửa → **Publish** lại.
- **Xoá:** mở nó ra → menu **⋯** (góc trên phải) → **Delete**.

---

## CÂU HỎI THƯỜNG GẶP

**Tin có hiện ngay không?**
Trong ~60 giây. Web cache nhẹ để tải nhanh; không cần build lại.

**Ảnh up vào đâu?**
Tự động lên CDN của Sanity. Không cần bỏ file vào thư mục `public/` nữa.

**Tiếng Anh dịch thế nào?**
Tự động khi người xem mở bản tiếng Anh — y như cơ chế cũ. Bạn chỉ viết
tiếng Việt.

**Dữ liệu cũ trong `data/news.ts` / `data/gallery.ts` còn dùng không?**
Còn — làm "bản dự phòng". Khi Sanity **chưa có** mục nào thì web lấy từ
file cũ. Khi Sanity **đã có** dữ liệu thì web ưu tiên Sanity. Muốn dọn
hẳn file cũ thì xoá nội dung trong 2 file đó sau khi đã nhập lên Sanity.

**Chi phí?**
Miễn phí với quy mô lab (10.000 mục, 3 người dùng).

---

## (Nâng cao) Chuyển sang Studio host riêng — Phương án B

Nếu sau này muốn tách Studio ra địa chỉ riêng `itd-lab.sanity.studio`
(web nhẹ hơn, Studio cập nhật độc lập):

```powershell
cd d:\web\lab
npx sanity deploy        # làm theo hướng dẫn, chọn tên studio
```

Rồi **xoá thư mục** `app/studio/` trong web. Data và schema giữ nguyên,
không phải làm lại gì.
