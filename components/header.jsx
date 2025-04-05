import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import UserMenu from "./user-menu";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

async function Header() {
  await checkUser();

  return (
    <nav className="mx-auto py-2 px-6 flex justify-between items-center shadow-xl border-b-2 bg-gradient-to-r from-blue-500 to-indigo-600">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width="150"
          height="60"
          alt="Schedulrr Logo"
          className="h-16 w-auto transition-transform transform hover:scale-110"
        />
      </Link>
  
      <div className="flex items-center gap-6">
        <Link href="/events?create=true">
          <Button variant="default" className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 rounded-full shadow-lg hover:scale-105">
            <PenBox size={18} />
            <span className="hidden sm:inline">Create Event</span>
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 transition-all duration-300 rounded-full">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
