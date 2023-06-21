import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./components/ListingClient";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const user = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <Container>
      <ListingClient listing={listing} user={user} />
    </Container>
  );
}
