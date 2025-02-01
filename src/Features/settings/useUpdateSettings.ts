import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../service/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending, mutate, error } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("update setting successful");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  if (error) throw new Error("something wrong");

  return { isPending, updateSetting: mutate };
}

export default useUpdateSettings;
