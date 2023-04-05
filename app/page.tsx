import Banner from "@/components/Banner";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen bg-background flex items-center">
      <Navbar />
      <div className="h-96 w-full grid grid-cols-2">
        <Banner />
        <div>
          {/* <LoginForm /> */}
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
