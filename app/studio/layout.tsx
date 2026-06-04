// =================================================================
//  STUDIO ROOT LAYOUT (Phương án A)
// =================================================================
//  Sanity Studio sits OUTSIDE app/[locale], so it needs its own
//  <html>/<body> shell — it must not inherit the site's navbar,
//  footer, fonts or i18n provider. This is one of two "root layouts"
//  (the other is app/[locale]/layout.tsx); see Next.js "multiple
//  root layouts".
//
//  ⮕ When switching to Phương án B, delete the whole app/studio/ folder.
// =================================================================

export const metadata = {
  title: "ITD Lab — Studio",
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
