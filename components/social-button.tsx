import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const SocialButton = () => {
  return (
    <div className=" flex items-center justify-center w-full gap-x-2 ">
      <Button
        className="w-full gap-x-1 py-6 bg-blue-400"
        // onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" />
        Google
      </Button>
      <Button
        className="w-full gap-x-1 py-6 bg-blue-400"
        // onClick={() => {}}
        size={"lg"}
      >
        <FaGithub className="h-5 w-5" />
        Github
      </Button>
    </div>
  );
};
