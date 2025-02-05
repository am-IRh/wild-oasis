import type { CabinType } from "../../service/apiCabins";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";

interface CabinTableProps {
  cabins: CabinType[];
}

const CabinTable: React.FC<CabinTableProps> = ({ cabins }) => {
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

        <Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  );
};

export default CabinTable;
