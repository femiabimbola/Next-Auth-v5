import { CardWrapper } from "@/components/card-wrapper";
import { RegisterForm } from "@/components/register-form";

export const RegisterFormPage = () => {
  return (
    <CardWrapper
      headerLabel="Log In to your account"
      headerDescription="A complete Authentication System with Authjs V5"
      backButtonLabel="Have an account already? Please log in"
      backButtonHref="/auth/login"
      showSocial
    >
      <RegisterForm />
    </CardWrapper>
  );
};
