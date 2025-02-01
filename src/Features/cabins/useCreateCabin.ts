import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { MutationType } from "./cabin.type";

import { createCabin } from "../../service/apiCabins";

const successMessage = "New cabin Successfully created";
const editMessage = "Edit cabin successfully";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ newCabinData, id }: MutationType) =>
      id ? createCabin(newCabinData, id) : createCabin({ ...newCabinData }),
    onSuccess: (_, { id }) => {
      toast.success(id ? editMessage : successMessage);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
