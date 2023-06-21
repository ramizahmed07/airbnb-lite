import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useMemo } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  user?: User | null;
}

export default function useFavorite({ user, listingId }: IUseFavorite) {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, user?.favoriteIds]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!user) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [user, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}
