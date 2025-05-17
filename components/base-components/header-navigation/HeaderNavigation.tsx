import Link from "next/link";
import React from "react";

export const HeaderNavigation = () => {
  return (
    <div className="contain flex justify-between border-b border-neutral-300 items-center py-8">
      <div className="font-bold text-xl">NAJMTI</div>
      <div className="flex gap-8 text-sm">
        <Link href="/">Home</Link>
        <Link href="/admin-dashboard">Dashboard</Link>
      </div>
    </div>
  );
};
