"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Button } from "./ui/button";

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
    <div className="w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      <form className="space-y-4" onSubmit={formHandler}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
            onChange={inputHandler}
            value={loginCredentials.email}
            ref={inputRef}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={loginCredentials.password}
            onChange={inputHandler}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="hover:bg-primary-dark w-full rounded-md bg-primary px-4 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {!isLoading ? "Sign in" : "please wait. it takes a while"}
        </button>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button
          onClick={() => changeFormHandler()}
          variant="link"
          className="p-0 underline underline-offset-4"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
