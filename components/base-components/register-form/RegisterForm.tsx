"use client";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { registerUser } from "./registerHelper";
import { InputField } from "./InputField"; // adjust path as needed
import { loginWithEmail } from "@/services/appwrite-login";

export const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFullNameValid = fullName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length > 4;

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setSuccessMessage("Registration successful!");
      loginWithEmail(email, password).then((res) => {
        console.log("Login successful:", { res });
        // Handle successful login, e.g., redirect or show a message
      });
      setFormError(null);
      // clearFields();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.data?.error?.code;
        if (status === 409) {
          setFormError("Email is already registered.");
        } else if (status === 400) {
          setFormError("Invalid input. Please check your data.");
        } else {
          setFormError("Something went wrong. Please try again.");
        }
      } else {
        setFormError("Unexpected error. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!fullName || !email || !password) {
      setFormError("Please fill out all fields.");
      return;
    }

    mutation.mutate({ email, password, fullName });
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
          disabled={!isPasswordValid || mutation.isLoading}
          className="w-full py-2 bg-neutral-900 hover:bg-neutral-700 text-white font-semibold transition duration-200 disabled:opacity-50"
        >
          {mutation.isLoading ? "Registering..." : "Register"}
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
