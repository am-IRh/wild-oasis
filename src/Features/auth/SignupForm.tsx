import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

interface SignupFormData {
  fullname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignupForm() {
  const { signup, isPending } = useSignup();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<SignupFormData>();
  const onSubmit = ({ fullname, email, password }: SignupFormData) => {
    signup({ fullname, email, password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullname?.message}>
        <Input
          disabled={isPending}
          id="fullname"
          type="text"
          {...register("fullname", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isPending}
          id="email"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          disabled={isPending}
          id="password"
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isPending}
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <div className="flex gap-4">
          <Button disabled={isPending} type="reset" $variation="secondary" onClick={() => reset()}>
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            Create new user
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}
