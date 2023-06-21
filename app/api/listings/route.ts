import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      bathroomCount,
      description,
      category,
      guestCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price, 10),
      roomCount,
      title,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
