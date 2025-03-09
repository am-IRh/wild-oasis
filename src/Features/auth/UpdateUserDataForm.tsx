import { useRef, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateUser from "./useUpdateUser";
import { useUser } from "./useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateUser, isUploading } = useUpdateUser();

  const email = user?.email;
  const currentFullName = user?.user_metadata?.fullname;

  const [fullname, setFullname] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!fullname) return;

    updateUser(
      { fullname, avatar: avatar || undefined },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullname(currentFullName);
    setAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input disabled value={email} />
      </FormRow>
      <FormRow label="Full name">
        <Input
          disabled={isUploading}
          id="fullName"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          accept="image/*"
          disabled={isUploading}
          id="avatar"
          ref={fileInputRef}
          onChange={(e) => e.target.files && setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <>
          <Button type="reset" $variation="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUploading}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
