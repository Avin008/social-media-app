"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipLoader } from "react-spinners";
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
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
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
        `${process.env.NEXT_PUBLIC_URL}/user/login`,
        loginCredentials
      );
      return res.data;
    },
    {
      onSuccess: (res: {
        data: { token: string; _id: string };
        message: string;
      }) => {
        console.log(res);
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
    <div className="mx-auto h-fit w-full max-w-sm rounded-lg border border-[#3F3D56] pb-6 shadow-lg md:max-w-md lg:max-w-lg">
      <h1 className="mt-6 text-center text-3xl font-bold text-white">Login</h1>
      <form onSubmit={formHandler} className="mt-6 space-y-6 px-6 text-white">
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <input
            className="rounded-md border border-gray-400 bg-transparent p-3 text-[#C2E1E8] placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            onChange={inputHandler}
            value={loginCredentials.email}
            ref={inputRef}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            className="rounded-md border border-gray-400 bg-transparent p-3 text-[#C2E1E8] placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            onChange={inputHandler}
            value={loginCredentials.password}
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            disabled={isLoading}
            className="hover:bg-brand-dark flex items-center justify-center rounded-md bg-brand p-3 font-bold text-white shadow-md transition duration-300 ease-in-out disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <ClipLoader color="white" size={22} />{" "}
                <span>please wait. it takes a while</span>
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
          <span className="mt-2 text-center text-gray-300">
            Don't have an account?{" "}
            <button
              type="button"
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
