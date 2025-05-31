"use client";
import React, { useState } from "react";

import { InputField } from "./InputField"; // adjust path as needed
import { Account, ID } from "appwrite";
import { Databases } from "node-appwrite";
import client from "@/appwrite/appwrite-configs/public-client";
import keyClient from "@/appwrite/appwrite-configs/key-client";
import { useSessionStore } from "@/stores/useSessionStore";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithAppwrite } = useSessionStore();

  const isFullNameValid = fullName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length > 4;
  const account = new Account(client);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const databases = new Databases(keyClient as any);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted with values:", {
      fullName,
      email,
      password,
    });
    try {
      setIsLoading(true);
      let registerProcess: boolean = true;
      const newId = ID.unique();

      const res_main_db = await databases.createDocument(
        process.env.NEXT_PUBLIC_APP_WRITE_MAIN_DB_ID ?? "",
        process.env.NEXT_PUBLIC_APP_WRITE_USERS_COLLECTION_ID ?? "",
        newId,
        { email, name: fullName }
      );
      if (!res_main_db.$id) {
        registerProcess = false;
        return;
      }

      const res_auth_db = await account.create(
        newId,
        email,
        password,
        fullName
      );

      if (!res_auth_db.$id) {
        registerProcess = false;
        return;
      }
      const session = await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();

      if (registerProcess) {
        loginWithAppwrite({
          session,
          currentUser,
        });
        setSuccessMessage("Registration successful! You can now log in.");
        setFormError(null);
        setFullName("");
        setEmail("");
        setPassword("");
        router.push("/feed");
      }
    } catch (error) {
      console.error("❌ Registration failed:", error);
      setFormError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mt-10 space-y-6">
      <InputField
        label="Full Name"
        id="fullName"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        wrapperClassName={`transform transition-all duration-500 ease-out ${
          isFullNameValid
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      />

      <InputField
        label="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        wrapperClassName={`transform transition-all duration-500 ease-out ${
          isEmailValid
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      />

      <div
        className={`transform transition-all duration-500 ease-out ${
          isPasswordValid
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          type="submit"
          disabled={!isPasswordValid || isLoading}
          className="w-full py-2 bg-neutral-900 hover:bg-neutral-700 text-white font-semibold transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-gray-600 hover:underline">
          Sign in
        </a>
      </p>

      {formError && (
        <div className="px-3 text-red-600 text-sm bg-red-50 border border-red-200 py-2 ">
          {formError}
        </div>
      )}
      {successMessage && (
        <div className="px-3 text-green-700 text-sm bg-green-50 border border-green-200 py-2 ">
          {successMessage}
        </div>
      )}
    </form>
  );
};
