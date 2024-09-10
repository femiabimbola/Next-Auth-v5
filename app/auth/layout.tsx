interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <main className="flex h-full items-center justify-center bg-[#01113B] text-white ">{children}</main>;
};

export default AuthLayout;
