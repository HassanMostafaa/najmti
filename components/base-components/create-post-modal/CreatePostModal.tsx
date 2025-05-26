import { handleOverlayClick } from "@/lib/helper";
import React from "react";

export const CreatePostModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div
      className="absolute top-0 left-0 bg-[#00000058] w-full h-screen flex items-center justify-center"
      onClick={(e) => handleOverlayClick(e, closeModal)}
    >
      <div className="bg-white w-[60vw] h-[80vh] rounded-xl p-4">the popup</div>
    </div>
  );
};
