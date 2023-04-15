import { useState, useRef } from "react";
import Avatar from "./Avatar";
import { useMutation } from "react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipLoader } from "react-spinners";
const UpdateUserProfileCard = ({
  userData,
  toggleProfileCardHandler,
}: {
  userData: User;
  toggleProfileCardHandler: () => void;
}) => {
  const [updateUserData, setUpdateUserData] =
    useState<typeof userData>(userData);

  const token = useAuthStore((store) => store.token);

  const [updateProfilePic, setUpdateProfilePic] =
    useState<FileList | null>();

  const inputHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;

    setUpdateUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imgUploadRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = useMutation(async () => {
    const formData = new FormData();
    formData.append("fullname", updateUserData.fullname);
    formData.append("username", updateUserData.username);
    formData.append("email", updateUserData.email);
    formData.append("password", updateUserData.password);
    // @ts-ignore
    formData.append("image", updateProfilePic[0]);
    // @ts-ignore
    formData.append("token", token);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/user/update`,
      formData
    );
    return res.data;
  });

  return (
    <div className="p-5 text-white text-sm shadow-md flex flex-col items-center gap-5 py-5 bg-[#1E1F23] border-white h-fit w-96 rounded-md">
      <Avatar
        width={"60px"}
        height={"60px"}
        image={updateUserData.profilePic}
      />
      <button
        className="text-brand font-medium"
        onClick={() => {
          imgUploadRef.current?.click();
        }}
      >
        change profile pic
      </button>
      <div className="flex flex-col w-full gap-2">
        <label className="text-white" htmlFor="fullname">
          fullname
        </label>
        <input
          placeholder="john doe"
          className="bg-transparent px-3 rounded-md border p-2 w-full"
          type="text"
          name="fullname"
          value={updateUserData.fullname}
          onChange={inputHandler}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-white" htmlFor="fullname">
          username
        </label>
        <input
          className="bg-transparent rounded-md px-3 border p-2 w-full"
          placeholder="johndoe776"
          type="text"
          name="username"
          value={updateUserData.username}
          onChange={inputHandler}
        />
      </div>
      <div className="flex-col hidden gap-2 w-full">
        <input
          className="bg-transparent hidden rounded-md px-3 border p-2 w-full"
          placeholder="johndoe776"
          type="file"
          ref={imgUploadRef}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            setUpdateProfilePic(e.currentTarget.files);
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <label className="text-white" htmlFor="fullname">
          email
        </label>
        <input
          className="bg-transparent rounded-md px-3 border p-2 w-full"
          placeholder="johndoe@gmail.com"
          type="email"
          name="email"
          value={updateUserData.email}
          onChange={inputHandler}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <label className="text-white" htmlFor="fullname">
          password
        </label>
        <input
          className="bg-transparent rounded-md px-3 border p-2 w-full"
          placeholder="johndoe@gmail.com"
          type="password"
          name="password"
          value={updateUserData.password}
          onChange={inputHandler}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <button
          className="w-full p-2 flex items-center justify-center rounded-md bg-brand text-white"
          onClick={() => {
            mutate();
          }}
        >
          {!isLoading ? (
            "Update Profile"
          ) : (
            <ClipLoader size={20} color="white" />
          )}
        </button>
        <button
          className="w-full p-2 rounded-md border border-brand text-brand font-semibold"
          onClick={toggleProfileCardHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateUserProfileCard;
