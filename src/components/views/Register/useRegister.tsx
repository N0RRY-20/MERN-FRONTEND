import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { authServices } from "@/services/auth";
import { registerSchema, type RegisterSchema } from "@/validations/auth";

const getErrorMessage = (error: unknown) => {
  // Backend selalu membalas { message, data }, termasuk saat gagal.
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message;
  }

  return "Something went wrong. Please try again.";
};

export const useRegister = () => {
  const router = useRouter();

  const { control, handleSubmit, reset, setError, clearErrors, formState } =
    useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
      mode: "onTouched",
      defaultValues: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: RegisterSchema) => authServices.register(payload),
    onSuccess: () => {
      reset();
      router.push("/auth/register/success");
    },
    onError: (error) => setError("root", { message: getErrorMessage(error) }),
  });

  const onSubmit = handleSubmit((values) => {
    clearErrors("root");
    mutate(values);
  });

  return {
    control,
    onSubmit,
    isPending,
    isSuccess,
    errorMessage: formState.errors.root?.message,
  };
};
