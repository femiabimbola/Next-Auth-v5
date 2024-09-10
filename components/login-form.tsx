import { CardWrapper } from "@/components/card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Log In to your account"
      headerDescription="A complete Authentication System with Authjs V5"
      backButtonLabel="Don't have an account? Please register"
      backButtonHref="/auth/register"
      showSocial
    >
      <div> The login form</div>
    </CardWrapper>
  );
};
