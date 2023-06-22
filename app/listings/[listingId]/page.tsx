import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./components/ListingClient";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const user = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <Container>
        <ListingClient
          reservations={reservations}
          listing={listing}
          currentUser={user}
        />
      </Container>
    </ClientOnly>
  );
}
