# Demo độc lập — xem nhanh không cần build

Các file `.html` trong thư mục này là **bản xem trước độc lập**:

- **Double-click** để mở bằng trình duyệt — KHÔNG cần `npm`, không cần
  `npm run dev`, không cần `npm run build`.
- Dùng để chỉnh và xem một animation/component **realtime** trước khi
  áp vào web thật.
- Thư mục `demo/` này không ảnh hưởng tới web production (Next.js chỉ
  build trong `app/`).

## Có gì ở đây

| File | Xem cái gì | Có thanh chỉnh? |
|------|------------|-----------------|
| `gears.html` | Bánh răng nền (GearsBackground) | ✅ đậm/nhạt, viền, tốc độ, sáng/tối |

## Cách dùng `gears.html`

1. Double-click `demo/gears.html`.
2. Kéo các thanh trượt ở góc phải:
   - **Độ đậm tổng thể** — bánh răng rõ hay mờ
   - **Độ đặc thân / Độ đậm viền** — chi tiết răng
   - **Tốc độ** — quay nhanh/chậm
   - Nút **Dark** — xem trên nền tối
3. Khi ưng ý, bấm **Copy giá trị** → dán vào:
   - `components/GearsBackground.tsx` (màu `text-brand/NN`, `fillOpacity`,
     `strokeOpacity`, `animationDuration`)

> Sau khi chỉnh trong demo và quyết được con số, chỉ cần báo mình con số
> đó (hoặc tự sửa trong GearsBackground.tsx) — không phải build lại để
> "dò" từng giá trị nữa.
