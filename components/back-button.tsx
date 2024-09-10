import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="mx-auto hover:text-blue-900">
      <Link href={href}>{label}</Link>;
    </div>
  );
};
