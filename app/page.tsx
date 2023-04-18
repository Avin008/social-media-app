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
    <main className="flex h-screen items-center bg-background">
      <Navbar />
      <div className="grid w-full grid-cols-2">
        <div className="flex items-center justify-center">
          <Banner />
        </div>
        <div className="flex items-center justify-between">
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
