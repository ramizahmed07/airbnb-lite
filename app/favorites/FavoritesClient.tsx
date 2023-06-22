"use client";

import { User } from "@prisma/client";

import { SafeListing } from "@/types";
import ListingCard from "@/components/listings/ListingCard";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard user={currentUser} key={listing.id} listing={listing} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
