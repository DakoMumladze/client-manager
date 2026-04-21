"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "font-sans text-sm rounded-lg border border-stone-200 bg-white text-stone-800 shadow-lg",
          success: "border-green-200 bg-green-50 text-green-800",
          error: "border-red-200 bg-red-50 text-red-800",
        },
      }}
    />
  );
}
