import { useQuery } from "@tanstack/react-query";

import type { CabinType } from "../../service/apiCabins";

import { getCabins } from "../../service/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery<CabinType[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
