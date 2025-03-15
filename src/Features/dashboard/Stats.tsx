import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import type { BookingType } from "../../service/apiBookings";

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

interface Booking {
  totalPrice: number;
}

interface StatsProps {
  bookings: BookingType[];
  confirmedStays: BookingType[];
  numDays: number;
  cabinCount: number;
}
export default function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings.length;
  const sales: number = bookings.reduce((acc: number, cur: Booking) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
  return (
    <>
      <Stat title="Bookings" value={numBookings} color="blue" icon={<HiOutlineBriefcase />} />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat title="Check ins" value={checkins} color="indigo" icon={<HiOutlineCalendarDays />} />
      <Stat
        title="Occupancy rate"
        value={`${Math.round(occupation * 100)}%`}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
