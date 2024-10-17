import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { SocialButton } from "@/components/social-button";
import { BackButton } from "@/components/back-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["800"],
});

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <div className="text-center">
        <CardHeader className={cn("text-4xl", font.className)}>{headerLabel}</CardHeader>
        <CardDescription className="text-xl -mt-4">{headerDescription}</CardDescription>
      </div>
      <CardContent> {children}</CardContent>
      {showSocial && (
        <CardFooter className="">
          <SocialButton />
        </CardFooter>
      )}
      <CardFooter>
        {" "}
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
