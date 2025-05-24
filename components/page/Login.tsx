/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { InternalEndpointLoginRequest } from "@/services/internal-requests/InternalEndpointLoginRequest";
import { useSessionStore } from "@/stores/useSessionStore";
import React, { useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { parse } from "@/lib/helper";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { loginWithAppwrite, session } = useSessionStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setError(null);
    const response = await InternalEndpointLoginRequest(formData);
    if (response?.session?.$id) {
      loginWithAppwrite({
        session: response.session,
        currentUser: response.currentUser,
      });
    } else {
      setError(parse(response?.response)?.message);
    }
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    const session = localStorage.getItem("user-session-store");

    if (session) {
      const parsedSession = JSON.parse(session);
      if (parsedSession?.state?.session?.$id) {
        redirect(`/`); // Navigate to the new post page
      }
    }
  }, [session]);
  // Check if the user is already logged in

  return (
    <div className="py-10 contain">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column with Text Content */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-700 mb-4">
            Sign in to access your dashboard, manage your account, and explore
            the latest updates tailored to your activity.
          </p>
          <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-2">
            <li>Secure access to your personalized dashboard</li>
            <li>Manage your profile and preferences</li>
            <li>View recent activity and statistics</li>
            <li>Get early access to new features</li>
          </ul>
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a href="#" className="text-blue-600 underline">
              Contact support
            </a>
          </p>
        </div>

        {/* Right Column with Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full p-3 md:p-6 border border-gray-300"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* 
          <div className="mb-4 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-neutral-600" />
              Remember me
            </label>
            <a href="#" className="text-neutral-600 hover:underline">
              Forgot password?
            </a>
          </div> */}

          {error && (
            <div className="mb-4 text-sm text-red-600 border border-red-300 bg-red-100 p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neutral-600 text-white py-2 hover:bg-neutral-700 transition-colors duration-200"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-neutral-700 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
