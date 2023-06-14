"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";

export default function UserMenu() {
  const { data: session } = useSession();

  const { onOpen } = useRegisterModal();
  const { onOpen: onOpenLoginModal } = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
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
            <Avatar />
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
            {session?.user ? (
              <>
                <MenuItem onClick={() => {}}>My trips</MenuItem>
                <MenuItem onClick={() => {}}>My favorites</MenuItem>
                <MenuItem onClick={() => {}}>My reservations</MenuItem>
                <MenuItem onClick={() => {}}>My properties</MenuItem>
                <MenuItem onClick={() => {}}>Airbnb my home</MenuItem>
                <MenuItem onClick={signOut}>Log out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={onOpenLoginModal}>Login</MenuItem>
                <MenuItem onClick={onOpen}>Sign up</MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
