import BookingTable from "../Features/bookings/BookingTable";
import { BookingTableOperations } from "../Features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Booking() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Booking</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Booking;
