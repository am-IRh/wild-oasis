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
  guests: { fullName: string; email: string };
  cabins: { name: string };
}

export async function getBookings({
  filter,
  sortBy,
}: {
  filter: { field: string; value: string; method?: string } | null;
  sortBy?: { field: string; direction: string };
}) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name),  guests(fullName, email)"
    );

  // FILTER
  if (filter !== null) query = query[filter.method || "eq"](filter.field, filter.value);
  // SORT
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  const { data, error } = await query;

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data as unknown as BookingType[];
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
