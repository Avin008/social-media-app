"use client";

import Link from "next/link";
import { useState } from "react";

type LoginCredentials = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials>({
      email: "",
      password: "",
    });

  const inputHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    setLoginCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guestLogin = () => {
    setLoginCredentials({
      email: "johndoe@gmail.com",
      password: "johndoe@12345",
    });
  };

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="border border-[#3F3D56] shadow-md rounded-md pb-5 h-fit mx-auto w-[70%]">
      <h1 className="text-2xl text-center mt-5 text-white">
        Login
      </h1>
      <form
        onSubmit={formHandler}
        className="text-white space-y-5 mt-5 px-5"
      >
        <div className="flex flex-col gap-2">
          <label id="email">Email</label>
          <input
            className="p-2 px-3 placeholder:text-gray-500 bg-transparent border border-gray-400 text-[#C2E1E8] rounded-md"
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            onChange={inputHandler}
            value={loginCredentials.email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label id="email">Password</label>
          <input
            className="p-2 px-3 placeholder:text-gray-500 bg-transparent border border-gray-400 text-[#C2E1E8] rounded-md"
            type="password"
            name="password"
            placeholder="**********"
            onChange={inputHandler}
            value={loginCredentials.password}
          />
        </div>
        <div className="flex flex-col gap-3">
          <button className="bg-brand p-2 font-bold rounded-md text-white">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
