"use client";
import { useState, useRef } from "react";
import Avatar from "./Avatar";
import { useMutation } from "react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
const UpdateUserProfileCard = ({
  userData,
  toggleProfileCardHandler,
}: {
  userData: UserType;
  toggleProfileCardHandler: () => void;
}) => {
  const [updateUserData, setUpdateUserData] =
    useState<any>(userData);

  const token = useAuthStore((store) => store.token);

  const [updateProfilePic, setUpdateProfilePic] =
    useState<FileList | null>();

  const inputHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;

    setUpdateUserData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imgUploadRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isLoading: isProfileUpdating,
  } = useMutation(
    async () => {
      const formData = new FormData();
      formData.append("fullname", updateUserData.fullname);
      formData.append("username", updateUserData.username);
      formData.append("email", updateUserData.email);
      formData.append("password", updateUserData.password);
      // @ts-ignore
      formData.append("image", updateProfilePic);
      // @ts-ignore
      formData.append("token", token);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/update`,
        formData
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["users"]);
        toggleProfileCardHandler();
      },
    }
  );

  return (
    <div className="flex h-fit w-96 flex-col items-center gap-5 rounded-md border-white bg-[#1E1F23] p-5 py-5 text-sm text-white shadow-md">
      <Avatar
        width={"60px"}
        height={"60px"}
        image={updateUserData?.profilePic}
      />
      {/* <button
        className="font-medium text-brand"
        onClick={() => {
          imgUploadRef.current?.click();
        }}
      >
        change profile pic
      </button> */}
      <div className="flex w-full flex-col gap-2">
        <label className="text-white" htmlFor="fullname">
          fullname
        </label>
        <input
          placeholder="john doe"
          className="w-full rounded-md border bg-transparent p-2 px-3"
          type="text"
          name="fullname"
          value={updateUserData?.fullname}
          onChange={inputHandler}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <label className="text-white" htmlFor="fullname">
          username
        </label>
        <input
          className="w-full rounded-md border bg-transparent p-2 px-3"
          placeholder="johndoe776"
          type="text"
          name="username"
          value={updateUserData?.username}
          onChange={inputHandler}
        />
      </div>
      <div className="hidden w-full flex-col gap-2">
        <input
          className="hidden w-full rounded-md border bg-transparent p-2 px-3"
          placeholder="johndoe776"
          type="file"
          ref={imgUploadRef}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            // @ts-ignore
            setUpdateProfilePic(e.currentTarget.files[0]);
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <label className="text-white" htmlFor="fullname">
          email
        </label>
        <input
          className="w-full rounded-md border bg-transparent p-2 px-3"
          placeholder="johndoe@gmail.com"
          type="email"
          name="email"
          value={updateUserData?.email}
          onChange={inputHandler}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <label className="text-white" htmlFor="fullname">
          password
        </label>
        <input
          className="w-full rounded-md border bg-transparent p-2 px-3"
          placeholder="johndoe@gmail.com"
          type="password"
          name="password"
          value={updateUserData?.password}
          onChange={inputHandler}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <button
          className="flex w-full items-center justify-center rounded-md bg-brand p-2 text-white"
          onClick={() => {
            updateProfile();
          }}
        >
          {!isProfileUpdating ? (
            "Update Profile"
          ) : (
            <ClipLoader size={20} color="white" />
          )}
        </button>
        <button
          className="w-full rounded-md border border-brand p-2 font-semibold text-brand"
          onClick={toggleProfileCardHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateUserProfileCard;
