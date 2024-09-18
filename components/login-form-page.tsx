import { CardWrapper } from "@/components/card-wrapper";
import { LoginForm } from "./login-form";

export const LoginFormPage = () => {
  return (
    <CardWrapper
      headerLabel="Log In to your account"
      headerDescription="A complete Authentication System with Authjs V5"
      backButtonLabel="Don't have an account? Please register"
      backButtonHref="/auth/register"
      showSocial
    >
      <LoginForm />
    </CardWrapper>
  );
};
