import React from "react";

export default function NextjsPage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  return (
    <div>
      Private route - ADMIN DASHBOARD --{" "}
      {JSON.stringify({ params, searchParams })}
    </div>
  );
}
