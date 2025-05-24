"use client";
import { useSessionStore } from "@/stores/useSessionStore";
import React, { JSX, useLayoutEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Activity,
  Award,
  Clock,
  Settings,
} from "lucide-react";

// Type definitions for Appwrite user data
interface HashOptions {
  type: string;
  memoryCost: number;
  timeCost: number;
  threads: number;
}

interface NotificationTarget {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  userId: string;
  providerId: string | null;
  providerType: string;
  identifier: string;
  expired: boolean;
}

interface AppwriteUser {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  password: string;
  hash: string;
  hashOptions: HashOptions;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Record<string, unknown>;
  targets: NotificationTarget[];
  accessedAt: string;
}

interface ApiResponse {
  user: AppwriteUser;
}

// type LabelType = "admin" | "premium" | "mvp";

interface LabelColors {
  [key: string]: string;
}

export const Profile: React.FC = () => {
  const { user } = useSessionStore();
  const [fetchedUser, setFetchedUser] = React.useState<AppwriteUser | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const requestInternalRoute = async (): Promise<void> => {
    if (!user?.id) {
      setError("No user ID available");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-by-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: ApiResponse = await res.json();

      if (!data.user) {
        throw new Error("No user data received");
      }

      setFetchedUser(data.user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch user data";
      console.error("Error calling internal route:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (user?.id) {
      requestInternalRoute();
    } else {
      console.warn("User ID is not available");
      setLoading(false);
    }
  }, [user?.id]);

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const getLabelColor = (label: string): string => {
    const colors: LabelColors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      premium: "bg-purple-100 text-purple-800 border-purple-200",
      mvp: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      colors[label.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  //   const isValidLabel = (label: string): label is LabelType => {
  //     return ["admin", "premium", "mvp"].includes(label.toLowerCase());
  //   };

  const renderLoadingState = (): JSX.Element => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50  p-6">
      <div className="contain">
        <div className="animate-pulse">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderErrorState = (): JSX.Element => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50  p-6 flex items-center justify-center">
      <div className="text-center">
        <User className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Error Loading Profile
        </h2>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => requestInternalRoute()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderEmptyState = (): JSX.Element => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50  p-6 flex items-center justify-center">
      <div className="text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          No User Data
        </h2>
        <p className="text-gray-500">
          Unable to load user profile information.
        </p>
      </div>
    </div>
  );

  const renderContactInfo = (user: AppwriteUser): JSX.Element => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Mail className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Contact Information
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center p-4 rounded-lg">
          <Mail className="w-5 h-5 text-gray-500 mr-3" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{user.email}</p>
            <div className="flex items-center mt-1">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  user.emailVerification ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`text-xs ${
                  user.emailVerification ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.emailVerification ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-500 mr-3" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{user.phone}</p>
            <div className="flex items-center mt-1">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  user.phoneVerification ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`text-xs ${
                  user.phoneVerification ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.phoneVerification ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityInfo = (user: AppwriteUser): JSX.Element => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-5 h-5 text-green-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Security & Access
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">
                Multi-Factor Authentication
              </p>
              <p className="text-sm text-gray-600">Additional security layer</p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.mfa
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.mfa ? "Enabled" : "Disabled"}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Activity className="w-5 h-5 text-gray-500 mr-3" />
            <p className="font-medium text-gray-900">Last Access</p>
          </div>
          <p className="text-sm text-gray-600 ml-8">
            {formatDate(user.accessedAt)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-gray-500 mr-3" />
            <p className="font-medium text-gray-900">Password Updated</p>
          </div>
          <p className="text-sm text-gray-600 ml-8">
            {formatDate(user.passwordUpdate)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderAccountDetails = (user: AppwriteUser): JSX.Element => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Calendar className="w-5 h-5 text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Created</span>
          <span className="font-medium text-gray-900">
            {formatDate(user.$createdAt)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Last Updated</span>
          <span className="font-medium text-gray-900">
            {formatDate(user.$updatedAt)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Registration</span>
          <span className="font-medium text-gray-900">
            {formatDate(user.registration)}
          </span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-600">Hash Algorithm</span>
          <span className="font-medium text-gray-900 capitalize">
            {user.hash}
          </span>
        </div>
      </div>
    </div>
  );

  const renderNotificationTargets = (
    targets: NotificationTarget[]
  ): JSX.Element => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Award className="w-5 h-5 text-orange-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Notification Targets
        </h2>
      </div>

      <div className="space-y-3">
        {targets.map((target: NotificationTarget) => (
          <div key={target.$id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 capitalize">
                {target.providerType}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  target.expired
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {target.expired ? "Expired" : "Active"}
              </span>
            </div>
            <p className="text-sm text-gray-600">{target.identifier}</p>
            <p className="text-xs text-gray-500 mt-1">
              Created: {formatDate(target.$createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Early returns for different states
  if (loading) {
    return renderLoadingState();
  }

  if (error) {
    return renderErrorState();
  }

  if (!fetchedUser) {
    return renderEmptyState();
  }

  return (
    <div className="py-4">
      <div className="contain">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  fetchedUser.status ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {fetchedUser.name}
                  </h1>
                  <p className="text-gray-600 mb-4">ID: {fetchedUser.$id}</p>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-2">
                    {fetchedUser.labels.map((label: string, index: number) => (
                      <span
                        key={`${label}-${index}`}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getLabelColor(
                          label
                        )}`}
                      >
                        {label.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 md:mt-0">
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      fetchedUser.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        fetchedUser.status ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></div>
                    {fetchedUser.status ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          {renderContactInfo(fetchedUser)}

          {/* Security & Access */}
          {renderSecurityInfo(fetchedUser)}

          {/* Account Details */}
          {renderAccountDetails(fetchedUser)}

          {/* Notification Targets */}
          {fetchedUser.targets &&
            fetchedUser.targets.length > 0 &&
            renderNotificationTargets(fetchedUser.targets)}
        </div>
      </div>
    </div>
  );
};
