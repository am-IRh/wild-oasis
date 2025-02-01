import type { CabinCreateWithImage } from "../../service/apiCabins";

/**
 * Handles the cabin submission for both create and update scenarios.
 *
 * @param {CabinCreateWithImage} data - The form data, which can contain either an image file or an image URL.
 * @param {number | undefined} editId - The cabin ID if editing.
 * @param {Function} mutate - The mutation function to call.
 * @param {Function} reset - Function to reset the form.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [onShowForm] - Optional callback to hide the form on success.
 */
export function handleCabinSubmit(
  data: CabinCreateWithImage,
  editId: number | undefined,
  mutate: any,
  reset: any,
  onShowForm?: React.Dispatch<React.SetStateAction<null>>
) {
  const isEditSession = Boolean(editId);
  const mutationData = isEditSession
    ? { newCabinData: { ...data }, id: editId }
    : { newCabinData: data };

  mutate(mutationData, {
    // Reset the form only if it's a create operation.
    onSuccess: () => {
      if (!isEditSession) reset();
      if (onShowForm) onShowForm(null);
    },
  });
}
