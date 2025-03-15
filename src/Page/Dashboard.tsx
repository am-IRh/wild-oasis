import DashboardFilter from "../Features/dashboard/DashboardFilter";
import { DashboardLayout } from "../Features/dashboard/DashboardLayout";
import { useRecentBookings } from "../Features/dashboard/useRecentBookings";
import { useRecentStays } from "../Features/dashboard/useRecentStays";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

const Dashboard = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Hello</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
};
export default Dashboard;
