import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import type { LoginCredentials } from "../../service/apiAuth";

import { login as loginApi } from "../../service/apiAuth";

export function useLogin() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryclient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isPending };
}
