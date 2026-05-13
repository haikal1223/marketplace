"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import { TextField, FormProvider } from "components/form-hook";
// LOCAL CUSTOM COMPONENTS
import Label from "../components/label";
import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK
import usePasswordVisible from "../use-password-visible";

// LOGIN FORM FIELD VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid Email Address").required("Email is required")
});

export default function LoginPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | null>(null);
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  const initialValues = { email: "", password: "" };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const handleSubmitForm = handleSubmit(async (values) => {
    setError(null);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (result?.error) {
      setError("Email atau password salah. Silakan coba lagi.");
      return;
    }

    // Redirect: callbackUrl → role-based dashboard → homepage
    if (callbackUrl) {
      router.push(callbackUrl);
    } else {
      // Fetch session to determine role-based redirect
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "VENDOR") router.push("/vendor/dashboard");
      else router.push("/");
    }
    router.refresh();
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div className="mb-1">
        <Label>Email or Phone Number</Label>
        <TextField
          fullWidth
          name="email"
          type="email"
          size="medium"
          placeholder="exmple@mail.com"
        />
      </div>

      <div className="mb-2">
        <Label>Password</Label>
        <TextField
          fullWidth
          size="medium"
          name="password"
          autoComplete="on"
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
            }
          }}
        />
      </div>

      <Button
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}>
        Login
      </Button>
    </FormProvider>
  );
}
