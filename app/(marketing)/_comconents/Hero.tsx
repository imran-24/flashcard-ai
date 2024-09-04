import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
//
// Upload your notes and turn them into interactive flashcards.
// Ace your studies with personalized quizzes based on your documents.

 

const Hero = () => {
  const words = [
    {
      text: "Elevate",
    },
    {
      text: "your",
    },
    {
      text: "learning",
    },
    {
      text: ",",
    },
    {
      text: "quiz",
      className: "text-blue-500 dark:text-blue-500 ",
    },
    {
      text: "your",
    },
    {
      text: "way",
    },
    {
      text: "to",
    },
    {
      text: "success.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Unlock knowledge, one flashcard at a time.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col items-center justify-center gap-y-3 max-w-[330px] w-full">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <div className="flex flex-col items-center  md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
              <SignUpButton mode="modal" forceRedirectUrl={"/quiz"}>
                <button className="w-40 h-10 flex items-center justify-center  rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                  Join now
                </button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl={"/quiz"}>
                <button className="w-60 h-10 flex items-center justify-center  rounded-xl bg-white text-black border border-black  text-sm">
                  Already Have an Account!
                </button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <button className="w-40 h-10 flex items-center justify-center  rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
              <Link href={"/dashboard"}>Continue learning</Link>
            </button>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </>
  );
};

export default Hero;
