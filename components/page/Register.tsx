import React from "react";
import { RegisterForm } from "../base-components/register-form/RegisterForm";

export default function Register() {
  return (
    <div className="contain py-10">
      <h1 className="text-3xl font-semibold">Create an Account</h1>
      <p className="my-4 text-gray-600 text-sm">
        Join us and get access to exclusive features, personalized content, and
        more.
      </p>
      <RegisterForm />
    </div>
  );
}
