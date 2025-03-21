import { useSearchParams } from "react-router-dom";

import type { CabinType } from "../../service/apiCabins";

import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

interface CabinTableProps {
  // cabins: CabinType[];
}

const CabinTable: React.FC<CabinTableProps> = () => {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading || !cabins) return <Spinner />;
  if (error) return <p>❌ Error: {error.message || "Something went wrong!"}</p>;

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: CabinType[] = [];
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-") as [keyof CabinType, string];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (Number(a[field]) - Number(b[field])) * modifier
  );

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
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin as CabinType} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
