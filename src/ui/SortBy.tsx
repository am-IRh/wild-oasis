import { useSearchParams } from "react-router-dom";

import type { SortByOptionType } from "./Select";

import { Select } from "./Select";

interface HandleChangeEvent {
  target: {
    value: string;
  };
}
const SortBy = ({ options }: { options: SortByOptionType[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e: HandleChangeEvent) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select type="white" value={sortBy} onChange={handleChange} options={options} />;
};
export default SortBy;
