import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb Lite",
  description: "Airbnb Lite is a lighter version of Airbnb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <RegisterModal />
        <Navbar /> {children}
      </body>
    </html>
  );
}
