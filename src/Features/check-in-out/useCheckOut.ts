import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../service/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isPending } = useMutation({
    mutationFn: (bookingId: number) => updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkOut, isCheckingOut: isPending };
}
