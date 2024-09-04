import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b p-4 flex items-center justify-between space-x-4 fixed inset-x-0 top-0 mb-20 shadow-sm z-[9999] bg-white">
      <div>
        <p>Flashcard AI</p>
      </div>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/" />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-8 text-neutral-400 animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default Navbar;
