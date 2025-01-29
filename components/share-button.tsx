"use client";

import React from "react";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

const ShareButton = () => {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Button
      className="flex items-center hover:bg-black group rounded-full transition-all duration-300 ease-in-out"
      variant={"ghost"}
      onClick={handleShare}
    >
      <Share className="h-4 w-4 group-hover:text-white" />
    </Button>
  );
};

export default ShareButton;
