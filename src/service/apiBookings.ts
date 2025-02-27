import { PAGE_SIZE } from "../ui/Pagination";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export interface BookingType {
  id: string;
  numNights: number;
  numGuests: number;
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
  startDate: string;
  endDate: string;
  status: string;
  cabinPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: {
    fullName: string;
    email: string;
    countryFlag: string;
    nationalID: number;
    nationality: string;
  };
  cabins: { name: string };
}

type FilterMethod = "eq" | "gt" | "gte" | "in" | "is" | "like" | "lt" | "lte" | "neq";

export async function getBookings({
  filter,
  sortBy,
  page,
}: {
  filter?: { field: string; value: string; method?: FilterMethod } | null;
  page: number;
  sortBy?: { field: string; direction: string };
}) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = (query as any)[filter.method || "eq"](filter.field, filter.value);
  // SORT
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  // PAGINATION
  if (page && !filter) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error("Bookings could not be loaded");
  return { data, count };
}

export async function getBooking(id: string): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as BookingType;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string): Promise<BookingType[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as BookingType[];
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<BookingType[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as BookingType[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<BookingType[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data as BookingType[];
}

export async function updateBooking(id: string, obj: Partial<BookingType>): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data as BookingType;
}

export async function deleteBooking(id: string): Promise<null> {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
