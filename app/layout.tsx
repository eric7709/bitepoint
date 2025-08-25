import { ClientWrapper } from "@/provider/ClientWrapper";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { Children } from "@/types";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your App",
  description: "Restaurant management app",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}