import PlusCircleIcon from "@heroicons/react/24/outline/esm/PlusCircleIcon";
import React from "react";

export const CreatePostFloatingButton = ({
  setIsCreatePostModalOpen,
}: {
  setIsCreatePostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <span
      className="fixed bottom-4 right-4 w-14 h-14 cursor-pointer"
      onClick={() => {
        setIsCreatePostModalOpen(true);
      }}
    >
      <PlusCircleIcon />
    </span>
  );
};
