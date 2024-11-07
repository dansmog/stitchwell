"use client";

import dynamic from "next/dynamic";
// import { useAuth, useClerk } from "@clerk/nextjs";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

const Overview = dynamic(() => import("@/app/components/screens/overview"), {
  ssr: false,
});

const Dashboard = () => {
  // const router = useRouter();
  // const { isSignedIn } = useAuth();
  // const { signOut } = useClerk();

  // useEffect(() => {
  //   if (typeof window !== "undefined" && !isSignedIn) {
  //     signOut({ redirectUrl: "/auth/sign-in" });
  //     router.push("/auth/sign-in"); // Redirect to sign-in page after sign-out
  //   }
  // }, [isSignedIn, router, signOut]);

  return (
    <section>
      <Overview />
    </section>
  );
};

export default Dashboard;
