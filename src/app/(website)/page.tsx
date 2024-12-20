import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
export default function Home() {
 
  return (
   <main>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <SignOutButton />
    </SignedIn>
   </main>
  );
}

