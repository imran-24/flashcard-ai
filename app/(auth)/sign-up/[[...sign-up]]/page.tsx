import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 ">
      
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        
        <div className="text-center space-y-4 pt-10">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <ClerkLoading>
            <Loader2 className="animate-spin mx-auto text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignUp />
          </ClerkLoaded>
        </div>

      </div>

      {/* <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src={'/logoipsum.svg'} alt="logo" width={100} height={100} />
      </div>

      <div className="h-16 bg-blue-600 lg:hidden fixed bottom-0 inset-x-0 flex flex-col items-center justify-center">
        <Image src={'/logoipsum.svg'} alt="logo" width={30} height={30} />
        <span className="text-white text-sm">Finance</span>
      </div> */}
    </div>
  );
}
