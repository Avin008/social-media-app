"use client";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { ClipLoader } from "react-spinners";

type SignupCredentials = {
  fullname: string;
  email: string;
  password: string;
};

const SignupForm = ({
  changeFormHandler,
}: {
  changeFormHandler: () => void;
}) => {
  const [signupCredentials, setSignupCredentials] = useState<SignupCredentials>(
    {
      fullname: "",
      email: "",
      password: "",
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSignupCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();
  const addAuth = useAuthStore((store) => store.addAuth);

  const { isLoading, mutate } = useMutation(
    async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/signup`,
        signupCredentials
      );
      return res.data;
    },
    {
      onSuccess: (res: {
        data: { token: string; _id: string };
        message: string;
      }) => {
        toast.success(res.message);
        addAuth(res.data.token, res.data._id);
        router.push("/feeds");
      },
      onError: (res: any) => {
        toast.error(res.response.data.message);
      },
    }
  );

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="mx-auto h-fit w-full max-w-sm rounded-lg border border-[#3F3D56] p-4 shadow-md md:max-w-md lg:max-w-lg">
      <h1 className="mt-4 text-center text-2xl font-bold text-white">
        Sign Up
      </h1>
      <form onSubmit={formHandler} className="mt-4 space-y-4 text-white">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname" className="text-lg font-medium">
            Full Name
          </label>
          <input
            className="rounded-md border border-gray-400 bg-transparent p-2 text-[#C2E1E8] placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="John Doe"
            ref={inputRef}
            onChange={inputHandler}
            value={signupCredentials.fullname}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <input
            className="rounded-md border border-gray-400 bg-transparent p-2 text-[#C2E1E8] placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={inputHandler}
            value={signupCredentials.email}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            className="rounded-md border border-gray-400 bg-transparent p-2 text-[#C2E1E8] placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            onChange={inputHandler}
            value={signupCredentials.password}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <button
            disabled={isLoading}
            className="hover:bg-brand-dark flex items-center justify-center rounded-md bg-brand p-2 font-bold text-white shadow-md transition duration-300 ease-in-out disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <ClipLoader color="white" size={22} />{" "}
                <span>please wait. it takes a while</span>
              </div>
            ) : (
              "SIGN UP"
            )}
          </button>
          <span className="mt-2 text-center text-gray-300">
            Already have an Account?{" "}
            <button
              type="button"
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
