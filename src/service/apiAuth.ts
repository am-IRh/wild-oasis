import supabase, { supabaseUrl } from "./supabase";

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface SignupCredentials {
  email: string;
  password: string;
  fullname: string;
  avatar?: string;
}

export async function signup({ fullname, email, password }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullname, avatar: "" } },
  });

  console.log(data, error);
  if (error) throw new Error(error.message);

  return data;
}
export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw Error(error.message);
}

interface UpdateCurrentUserProps {
  password?: string;
  fullname?: string;
  avatar?: File;
}
export async function updateCurrentUser({ password, fullname, avatar }: UpdateCurrentUserProps) {
  let updateData = {};

  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const filename = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage.from("avatar").upload(filename, avatar);

  if (uploadError) throw new Error(uploadError.message);

  const { data: updatedUser, error: avatarURLError } = await supabase.auth.updateUser({
    data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${filename}` },
  });

  if (avatarURLError) throw new Error(avatarURLError.message);
  return updatedUser;
}
