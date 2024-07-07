"use client";
import Banner from "@/components/Banner";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import { useState } from "react";

type CurrentForm = "login-form" | "signup-form";

export default function Home() {
  const [currentForm, setCurrentForm] = useState<CurrentForm>("login-form");

  const changeFormHandler = () => {
    setCurrentForm((currentForm) =>
      currentForm === "login-form" ? "signup-form" : "login-form"
    );
  };

  return (
    <main className="flex h-screen items-center bg-background lg:flex-row">
      <Navbar />
      <div className="flex w-full flex-col lg:flex-row">
        <div className="hidden w-full items-center justify-center p-4 lg:flex lg:w-1/2">
          <Banner />
        </div>
        <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
          {currentForm === "login-form" ? (
            <LoginForm changeFormHandler={changeFormHandler} />
          ) : (
            <SignupForm changeFormHandler={changeFormHandler} />
          )}
        </div>
      </div>
    </main>
  );
}
