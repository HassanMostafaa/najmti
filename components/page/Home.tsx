"use client";
import { useAppStore } from "@/stores/useAppStore";
import React from "react";

export const Home = () => {
  const { count } = useAppStore();
  return (
    <div className="">
      <p>here we will test the store and the store actions</p>
      <p>count: {count}</p>
      <button
        onClick={() => {
          useAppStore.getState().increment();
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          useAppStore.getState().reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};
