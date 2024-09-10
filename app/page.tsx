import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="flex h-full items-center justify-center bg-[#01113B] text-white ">
      <div>
        <h1 className="md:text-5xl font-bold text-2xl px-2 text-center">A Complete Authentication System </h1>
        <p className="mt-6 text-center">
          This application is a complete authentication built with AuthJs V5, Postgress, Resend and Prisma
        </p>
        <div className="flex justify-center">
          <Button className="mt-8 bg-blue-700 px-11 py-7 text-xl">Sign in</Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
