"use client";
import Banner from "@/components/Banner";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import { useState } from "react";

type CurrentForm = "login-form" | "signup-form";

export default function Home() {
  const [currentForm, setCurrentForm] =
    useState<CurrentForm>("login-form");

  const changeFormHandler = () => {
    setCurrentForm((currentForm) =>
      currentForm === "login-form"
        ? "signup-form"
        : "login-form"
    );
  };

  return (
    <main className="h-screen bg-background flex items-center">
      <Navbar />
      <div className="h-96 w-full grid grid-cols-2">
        <Banner />
        <div>
          {currentForm === "login-form" ? (
            <LoginForm
              changeFormHandler={changeFormHandler}
            />
          ) : (
            <SignupForm
              changeFormHandler={changeFormHandler}
            />
          )}
        </div>
      </div>
    </main>
  );
}
