import { useState } from "react";

import CabinTable from "../Features/cabins/CabinTable";
import CreateCabinForm from "../Features/cabins/CreateCabinFrom";
import { useCabins } from "../Features/cabins/useCabins";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
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
        <Button onClick={() => setShowForm((sh) => !sh)}>
          {showForm ? "Close Form" : "Add new cabin "}
        </Button>
        {showForm && <CreateCabinForm onShowForm={setShowForm} />}
      </Row>
    </>
  );
}

export default Cabins;
