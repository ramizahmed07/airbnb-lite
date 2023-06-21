import { Listing, Reservation, User } from "@prisma/client";

interface ListingClientProps {
  user: User | null;
  listing: Listing;
  reservations?: Reservation[];
}

export default function ListingClient() {
  return <div></div>;
}
