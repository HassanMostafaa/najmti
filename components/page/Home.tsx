"use client";
import Image from "next/image";
import React from "react";
import { NajmtiLogoText } from "../base-components/najmti-logo-text/NajmtiLogoText";

export const Home = () => {
  return (
    <div className="contain py-10 space-y-8">
      <div className="text-4xl flex gap-1 items-center font-extrabold text-sky-700">
        <span className="flex gap-3 max-md:text-xl">
          Welcome to <NajmtiLogoText size={""} />
        </span>
        <Image
          src="/assets/logo-square.png"
          width={100}
          height={100}
          className="w-[50px] h-[50px]"
          alt="logo"
        />
      </div>
      <div>
        <p className="text-lg text-gray-800">
          A mini social media app built with love and innovation, just for my
          lovely <span className="font-semibold text-sky-600">Najma</span>.
        </p>

        <p className="text-base text-gray-600 ">
          This is more than an app — it’s a modern space to connect, share, and
          enjoy moments in a stylish, intimate way.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="bg-white shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-sky-600 mb-3">
            ✨ Shared Moments
          </h2>
          <p className="text-gray-700">
            Capture and share your favorite memories — photos, thoughts, and
            snippets of life curated just for us.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-sky-600 mb-3">
            💬 Private Chat
          </h2>
          <p className="text-gray-700">
            A sleek and secure space to talk, plan, and dream — all private, all
            yours.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-sky-600 mb-3">
            📷 Gallery
          </h2>
          <p className="text-gray-700">
            Browse through a curated collection of our best memories — stylishly
            presented for easy moments of joy.
          </p>
        </div>

        <div className="bg-white  shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-sky-600 mb-3">
            🤝 Just Us
          </h2>
          <p className="text-gray-700">
            No followers, no pressure. Just a clean, elegant place to be
            ourselves.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-8 shadow-lg max-w-xl mx-auto text-white">
        <h2 className="text-2xl font-bold mb-3">
          ♥️ A to my little Najma, my everything
        </h2>
        <p>
          Thoughtfully designed with a modern flair, this app captures our
          shared journey — meaningful, stylish, and always connected.
        </p>
      </div>
      <p className="text-sm text-gray-500 italic text-center">
        — With love, Your Custom Made Hassan 💫
      </p>
    </div>
  );
};
