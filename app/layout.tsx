import { Toaster } from "react-hot-toast";
import { Nunito } from "next/font/google";

import { getCurrentUser } from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
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
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthSessionProvider>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          {/* @ts-expect-error Server Component */}
          <Navbar user={user} />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
