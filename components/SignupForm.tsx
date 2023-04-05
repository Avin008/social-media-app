"use client";
import { useState, useRef, useEffect } from "react";

type SignupCredentials = {
  username: string;
  email: string;
  password: string;
};

const SignupForm = ({
  changeFormHandler,
}: {
  changeFormHandler: () => void;
}) => {
  const [signupCredentials, setSignupCredentials] =
    useState<SignupCredentials>({
      username: "",
      email: "",
      password: "",
    });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    setSignupCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="border border-[#3F3D56] shadow-md rounded-md pb-5 h-fit mx-auto w-[70%]">
      <h1 className="text-2xl text-center mt-5 text-white">
        Sign Up
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
            value={signupCredentials.email}
            ref={inputRef}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label id="email">Username</label>
          <input
            className="p-2 px-3 placeholder:text-gray-500 bg-transparent border border-gray-400 text-[#C2E1E8] rounded-md"
            type="text"
            name="username"
            placeholder="johndoe779"
            onChange={inputHandler}
            value={signupCredentials.password}
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
            value={signupCredentials.password}
          />
        </div>
        <div className="flex flex-col gap-3">
          <button className="bg-brand shadow-sm p-2 font-bold rounded-md text-white">
            SIGN UP
          </button>
          <span className="mt-2 text-gray-300">
            Already had an Account?{" "}
            <button
              className="font-semibold text-white hover:underline hover:underline-offset-2"
              onClick={changeFormHandler}
            >
              Login
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
