// app/layout.js or app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import AppLayout from "@/components/app-layout"; // Client wrapper

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Your App",
  description: "Your Description",
  icons:{
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable}`}>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
