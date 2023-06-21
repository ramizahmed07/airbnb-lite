"use client";

import React, { useMemo, MouseEvent } from "react";
import { format } from "date-fns";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import HeartButton from "../HeartButton";

import useCountries from "@/hooks/useCountries";
import Image from "next/image";
import Button from "../Button";

interface ListingCardProps {
  listing: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  user: User | null | undefined;
}

export default function ListingCard({
  listing,
  user,
  actionId = "",
  actionLabel,
  disabled,
  onAction,
  reservation,
}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return;
    onAction?.(actionId);
  };

  const location = useMemo(
    () => getByValue(listing.locationValue),
    [getByValue, listing.locationValue]
  );

  const price = useMemo(() => {
    if (reservation) return reservation?.totalPrice;
    return listing.price;
  }, [listing.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={listing.imageSrc}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={listing.id} user={user} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button disabled={disabled} small onClick={handleCancel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
