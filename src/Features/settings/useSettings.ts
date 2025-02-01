import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../service/apiSettings";

export default function useSettings() {
  const { isPending, data } = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  return { isPending, settings: data };
}
