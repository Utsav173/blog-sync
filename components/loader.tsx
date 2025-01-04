import { cn } from "@/lib/utils";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className={cn(
        "w-12 h-12 rounded-full animate-spin",
        "border-4 border-primary/10",
        "border-t-primary"
      )}></div>
    </div>
  );
};

export default Loader;
