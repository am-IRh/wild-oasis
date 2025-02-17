import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import type { BookingType } from "../../service/apiBookings";

import { getBookings } from "../../service/apiBookings";

function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

  // Sort By
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<BookingType[]>({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  if (error) return console.log(`something went wrong ${error.message}`);
  return { bookings, isLoading };
}

export default useBookings;
