export const metadata = {
  title: "Traders Fortune AI",
  description: "AI-powered trading education, analysis, coaching and paper trading.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
