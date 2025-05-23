import React from "react";

export const NajmtiLogoText: React.FunctionComponent<{ size?: string }> = ({
  size = "14px",
}) => {
  return (
    <div className="font-bold text-neutral-900" style={{ fontSize: size }}>
      <span className="text-[#f46532]">N</span>
      AJMTI
    </div>
  );
};
