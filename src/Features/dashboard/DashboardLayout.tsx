import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const { bookings, isPending } = useRecentBookings();
  const { isPending: isStays, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading } = useCabins();

  if (isPending || isStays || isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        bookings={bookings!}
        cabinCount={cabins?.length ?? 0}
        confirmedStays={confirmedStays!}
      />
      <div>Today's</div>
      <DurationChart confirmedStays={confirmedStays!} />
      <SalesChart numDays={numDays} bookings={bookings!} />
    </StyledDashboardLayout>
  );
}
