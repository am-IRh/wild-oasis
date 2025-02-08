import { useSearchParams } from "react-router-dom";

import type { CabinType } from "../../service/apiCabins";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";

interface CabinTableProps {
  cabins: CabinType[];
}

const CabinTable: React.FC<CabinTableProps> = ({ cabins }) => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: CabinType[] = [];
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
