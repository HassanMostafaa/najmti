import React from "react";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "./appwrite-google-auth";

export const GoogleAuthButton = () => {
  return (
    <button
      onClick={async () => {
        console.log("Google Sign In Clicked");
        await googleAuth();
      }}
      type="button"
      className="cursor-pointer rounded bg-white hover:shadow-lg shadow transition-shadow py-2 px-4 my-4 w-full"
    >
      <span className="flex gap-4 items-center justify-center text-neutral-700 font-medium">
        <FcGoogle size={24} /> Google Sign In
      </span>
    </button>
  );
};
