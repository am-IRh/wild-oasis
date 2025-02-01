import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function CabinFormFields({ register, errors, getValues, isPending }: any) {
  return (
    <>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isPending}
          id="name"
          type="text"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isPending}
          id="maxCapacity"
          type="number"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          id="regularPrice"
          type="number"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          id="discount"
          type="number"
          {...register("discount", {
            required: "This field is required",
            validate: (value: unknown) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>
    </>
  );
}

export default CabinFormFields;
