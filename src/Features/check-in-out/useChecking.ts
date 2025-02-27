import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../service/apiBookings";

interface CheckMutationFnArg {
  bookingId: number;
  breakfast: {
    hasBreakfast?: boolean;
    extrasPrice?: number;
    totalPrice?: number;
  };
}
export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checking, isPending } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckMutationFnArg) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checking, isChecking: isPending };
}
