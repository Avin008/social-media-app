"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

type LoginCredentials = {
  email: string;
  password: string;
};

const LoginForm = ({
  changeFormHandler,
}: {
  changeFormHandler: () => void;
}) => {
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials>({
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
    setLoginCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();
  const addAuth = useAuthStore((store) => store.addAuth);

  const { isLoading, mutate, data } = useMutation(
    async () => {
      const res = await axios.post(
        "http://localhost:3333/login",
        loginCredentials
      );
      return res.data;
    },
    {
      onSuccess: (res: {
        data: { token: string; _id: string };
        message: string;
      }) => {
        addAuth(res.data.token, res.data._id);
        toast.success(res.message);
        router.push("/feeds");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
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
            ref={inputRef}
            required
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
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <button
            disabled={isLoading}
            className="bg-brand shadow-sm p-2 font-bold rounded-md text-white"
          >
            {isLoading ? "loading..." : "LOGIN"}
          </button>
          <span className="mt-2 text-gray-300">
            Don&apos;t Have an Account?{" "}
            <button
              className="font-semibold text-white hover:underline hover:underline-offset-2"
              onClick={changeFormHandler}
            >
              Join Now
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
