import { Toaster } from "react-hot-toast";
import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import "./globals.css";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb Lite",
  description: "Airbnb Lite is a lighter version of Airbnb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthSessionProvider>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
