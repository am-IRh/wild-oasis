import { useForm } from "react-hook-form";

import type { CabinCreateWithImage } from "../../service/apiCabins";
import type { PropsType } from "./cabin.type";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import CabinFormFields from "./CabinFormFields";
import { handleCabinSubmit } from "./handleCabinSubmit";
import { useCreateCabin } from "./useCreateCabin";

/**
 * Component for creating or editing a cabin.
 *
 * @param {PropsType} props - Component props.
 * @param {CabinCreateWithImage} [props.cabinToEdit] - Cabin data for edit mode, image not necessary.
 * @param {function} props.onShowForm - Callback to control the visibility of the form.
 * @returns {JSX.Element} The rendered CreateCabinForm component.
 */

function CreateCabinForm({ cabinToEdit, onCloseModal }: PropsType) {
  // Determine if we are in edit mode based on the existence of an ID.
  const { id: editId, ...editValue } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  // Retrieve the mutation function and pending state for creating/updating a cabin.
  const { mutate, isPending } = useCreateCabin();

  // Initialize the form with react-hook-form.
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinCreateWithImage>({
    defaultValues: isEditSession ? editValue : { discount: 0 },
  });

  // Wrap the form submission with react-hook-form's handleSubmit.
  const onSubmit = handleSubmit((data) =>
    // If editId is defined, we are editing; otherwise, we create a new cabin.
    handleCabinSubmit(data, editId, mutate, reset, onCloseModal)
  );

  return (
    <Form type={onCloseModal ? "modal" : "regular"} onSubmit={onSubmit}>
      <CabinFormFields
        getValues={getValues}
        isPending={isPending}
        register={register}
        errors={errors}
      />

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          accept="image/*"
          disabled={isPending}
          id="image"
          {...register("image", { required: isEditSession ? false : "This field is required" })}
        />
      </FormRow>
      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button disabled={isPending} type="button" $variation="secondary" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={isPending}>{isEditSession ? "Edit Cabin" : "Create new Cabin"}</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
