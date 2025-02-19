import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import type { BookingType } from "../../service/apiBookings";

import { getBookings } from "../../service/apiBookings";
import { PAGE_SIZE } from "../../ui/Pagination";

interface UseBookingsResult {
  bookings: BookingType[] | undefined;
  isLoading: boolean;
  count: number;
}

function useBookings(): UseBookingsResult {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

  // Sort By
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data;
  const count = data?.count ?? 0;

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, page: page + 1 }),
    });
  }
  if (error) throw new Error(`something went wrong ${(error as Error).message}`);
  return { bookings, isLoading, count } as UseBookingsResult;
}

export default useBookings;
