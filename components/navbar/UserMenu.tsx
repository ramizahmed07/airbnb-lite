"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const onRent = () => {
    if (!user) return loginModal.onOpen();
    rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden md:block text-sm font-semibold py-3 px-4 rounded-full
          hover:bg-neutral-100 transition cursor-pointer
          "
        >
          Airbnb your Home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4 md:py-1 md:px-2 rounded-full border border-neutral-200 gap-3
          flex flex-row items-center shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block ">
            <Avatar src={user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
          bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem onClick={() => router.push("/trips")}>
                  My trips
                </MenuItem>
                <MenuItem onClick={() => router.push("/favorites")}>
                  My favorites
                </MenuItem>
                <MenuItem onClick={() => router.push("/reservations")}>
                  My reservations
                </MenuItem>
                <MenuItem onClick={() => router.push("/properties")}>
                  My properties
                </MenuItem>
                <MenuItem onClick={rentModal.onOpen}>Airbnb my home</MenuItem>
                <MenuItem onClick={signOut}>Log out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen}>Login</MenuItem>
                <MenuItem onClick={registerModal.onOpen}>Sign up</MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
