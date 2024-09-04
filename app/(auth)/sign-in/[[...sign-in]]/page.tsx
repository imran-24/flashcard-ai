import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 ">
      
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
      
        <div className="text-center pt-16 space-y-4">
          <h1 className="font-bold text-3xl text-black/80">Welcome Back!</h1>
          <p className="text-base text-neutral-500">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <ClerkLoading>
            <Loader2 className="animate-spin mx-auto text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
        </div>

      </div>

      {/* <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src={'/logoipsum.svg'} alt="logo" width={100} height={100} />
      </div>

      <div className="h-16 bg-blue-600 lg:hidden fixed bottom-0 inset-x-0 flex flex-col items-center justify-center">
        <Image src={'/logoipsum.svg'} alt="logo" width={30} height={30} />
        <span className="text-white text-sm">Finance</span>
      </div>  */}

    </div>
  );
}
