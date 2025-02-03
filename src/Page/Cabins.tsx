import AddCabinBtn from "../Features/cabins/AddCabinBtn";
import CabinTable from "../Features/cabins/CabinTable";
import { useCabins } from "../Features/cabins/useCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Cabins() {
  const { isLoading, cabins, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <p>❌ Error: {error.message || "Something went wrong!"}</p>;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        {cabins && <CabinTable cabins={cabins} />}
        <AddCabinBtn />
      </Row>
    </>
  );
}

export default Cabins;
