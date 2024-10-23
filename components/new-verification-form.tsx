"use client";

import { CardWrapper } from "@/components/card-wrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  //Callback is important because the function is called on useffect
  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("No Token found");
      return;
    }

    await axios.get("/api/new-verification/", { params: { token } }).then((response: any) => {
      setSuccess(response.data.success);
      setError(response.data.error);
      router.push("/settings");
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel=" Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
