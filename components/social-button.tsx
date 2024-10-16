"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { signIn } from "next-auth/react"; // client componet
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const SocialButton = () => {
  const onClick = (provider: "google" | "linkedin") => {
    signIn(provider, { redirectTo: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className=" flex items-center justify-center w-full gap-x-2 ">
      <Button
        className="w-full gap-x-1 py-6 bg-blue-400"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
        Google
      </Button>
      <Button
        className="w-full gap-x-1 py-6 bg-blue-400"
        onClick={() => onClick("linkedin")}
        size={"lg"}
      >
        <FaLinkedin className="h-5 w-5" />
        LinkedIn
      </Button>
    </div>
  );
};
