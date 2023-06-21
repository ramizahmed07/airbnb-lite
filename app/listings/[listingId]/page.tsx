import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
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

  if (!listing) return <EmptyState />;

  return (
    <Container>
      <ListingClient
        reservations={reservations}
        listing={listing}
        currentUser={user}
      />
    </Container>
  );
}
