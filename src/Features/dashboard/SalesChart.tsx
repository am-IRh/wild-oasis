import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

import type { BookingType } from "../../service/apiBookings";

import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesChartProps {
  bookings: BookingType[];
  numDays: number;
}
function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales FROM {format(allDates[0], "MMM, dd, yyyy")} &mdash;{" "}
        {format(allDates.at(-1) ?? allDates[0], "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart height={300} width={700} data={data}>
          <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <YAxis tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} unit="$" />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            fill={colors.totalSales.fill}
            name="Total sales"
            type="monotone"
            unit="$"
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
          />
          <Area
            dataKey="extrasSales"
            fill={colors.extrasSales.fill}
            name="Extras sales"
            type="monotone"
            unit="$"
            stroke={colors.extrasSales.stroke}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
