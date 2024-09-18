import { CardWrapper } from "@/components/card-wrapper";

export const RegisterForm = () => {
  return (
    <CardWrapper
      headerLabel="Log In to your account"
      headerDescription="A complete Authentication System with Authjs V5"
      backButtonLabel="Have an account already? Please log in"
      backButtonHref="/auth/login"
      showSocial
    >
      <div> The Register form</div>
    </CardWrapper>
  );
};
