"use client";
import { deleteSession_DB } from "@/appwrite/services/delete-session_DB";
import { useSessionStore } from "@/stores/useSessionStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

// Import Heroicons
import {
  HomeIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const HeaderNavigation = () => {
  const { user, session, isLoggedIn, logout, clearSession } = useSessionStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (session?.$id) {
        const delSessionResponse = await deleteSession_DB({
          sessionId: session?.$id,
        });
        console.log("Session deleted:", delSessionResponse);
        logout();
        clearSession();
        // nextjs redirect
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="contain flex justify-between border-b border-neutral-300 items-center py-2 relative">
        {/* Logo */}
        <Link href="/">
          <div className="md:hidden">
            <Image
              src="/assets/logo-square.png"
              width={60}
              height={60}
              className="w-[50px] h-[50px]"
              alt="logo"
            />
          </div>
          <div className="font-bold text-xl max-md:hidden">
            <Image
              src="/assets/logo-full-removebg.png"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="hover:text-neutral-600 hover:underline transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/register"
            className="hover:text-neutral-600 hover:underline transition-colors duration-200"
          >
            Register
          </Link>
          {isLoggedIn === false && (
            <Link
              href="/login"
              className="bg-neutral-700 hover:bg-neutral-800 text-white px-4 py-2 transition-colors duration-200"
            >
              Login
            </Link>
          )}
          {isLoggedIn && session && (
            <Link
              href="/profile"
              className="relative bg-neutral-700 group text-white px-4 py-2"
            >
              {user?.name}
              <div className="absolute top-full p-3 group-hover:opacity-100 opacity-0 group-hover:pointer-events-auto pointer-events-none left-0 w-full bg-neutral-200 text-neutral-800 transition-all duration-200">
                <div
                  className="hover:underline cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 mobile-menu-container"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-neutral-700 my-1 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-neutral-700 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-80" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl md:hidden transform transition-transform duration-300 ease-in-out mobile-menu-container ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="font-bold text-lg">Menu</div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
            aria-label="Close mobile menu"
          >
            <XMarkIcon className="h-6 w-6 text-neutral-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col p-4 space-y-4">
          {isLoggedIn && user && (
            <div className="pb-4 border-b border-neutral-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <div className="font-medium text-neutral-900">
                    {user?.name}
                  </div>
                  <div className="text-sm text-neutral-500">Logged in</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 px-4 py-3 hover:underline rounded-lg hover:bg-neutral-100 transition-colors duration-200 text-neutral-700 font-medium"
            >
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>

            <Link
              href="/register"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 px-4 py-3 hover:underline rounded-lg hover:bg-neutral-100 transition-colors duration-200 text-neutral-700 font-medium"
            >
              <PencilSquareIcon className="w-5 h-5" />
              Register
            </Link>

            {isLoggedIn === false && (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg transition-colors duration-200 font-medium text-center"
              >
                <LockClosedIcon className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>

          {isLoggedIn && session && (
            <div className="pt-4 border-t border-neutral-200 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-left rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-neutral-700 font-medium"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 bg-neutral-50">
          <div className="text-center text-xs text-neutral-500">
            Swipe right or tap outside to close
          </div>
        </div>
      </div>
    </>
  );
};
