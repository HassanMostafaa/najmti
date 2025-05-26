"use client";
import React from "react";
import { CreatePostModal } from "../base-components/create-post-modal/CreatePostModal";
import { CreatePostFloatingButton } from "../base-components/create-post-floating-button/CreatePostFloatingButton";

export const Feed = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] =
    React.useState(false);
  return (
    <div className="contain py-10">
      Feed
      {!isCreatePostModalOpen && (
        <CreatePostFloatingButton
          setIsCreatePostModalOpen={setIsCreatePostModalOpen}
        />
      )}
      {isCreatePostModalOpen && (
        <CreatePostModal closeModal={() => setIsCreatePostModalOpen(false)} />
      )}
    </div>
  );
};
