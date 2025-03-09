import AddCabinBtn from "../Features/cabins/AddCabinBtn";
import CabinTable from "../Features/cabins/CabinTable";
import CabinTableOperations from "../Features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabinBtn />
      </Row>
    </>
  );
}

export default Cabins;
