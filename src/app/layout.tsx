import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const metadata: Metadata = {
  title: "trivia.tech frame",
  description:
    "trivia.tech is onchain multiplayer buzzer quiz game on mobile. This product is designed with innovative gamified minting experience for Web3 lovers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
