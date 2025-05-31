"use client";

import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

export const Profile = () => {
  const { user, session } = useSessionStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !session) {
      setError("User session not found. Please log in again.");
    }
    setLoading(false);
  }, [user, session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        <span className="ml-2 text-gray-500">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contain py-10">
        <div className="bg-red-100 text-red-700 p-4 rounded flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="contain py-10 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Welcome, <span className="font-medium">{user?.name || "Guest"}</span>!
        </p>
      </div>

      <div className="grid gap-4 bg-white p-6 rounded-lg shadow-md sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user?.email || "Not provided"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium">{user?.name || "Not available"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="font-medium">{user?.id || "Not available"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Session ID</p>
          <p className="font-medium">{session?.$id || "Not available"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="font-medium">
            {session?.$createdAt
              ? new Date(session.$createdAt).toLocaleString()
              : "Unknown"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
};
