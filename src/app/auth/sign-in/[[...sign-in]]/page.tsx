"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-up";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import ClerkAuthButton from "@/app/components/clerk/AuthButton";
import AuthWrapper from "@/app/components/clerk/AuthWrapper";
import ClerkInput from "@/app/components/clerk/Input";
import Loader from "@/app/components/ui/Loader";

export default function SignInPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCallback = pathname.split("/").includes("sso-callback");

  const { "sign-in": signIn } = useParams();

  const { isLoaded, userId } = useAuth();

  const redirectUrl = searchParams.get("redirect_url") || "/dashboard"; // Default to dashboard if not specified

  useEffect(() => {
    if (isLoaded && userId) {
      router.push(decodeURIComponent(redirectUrl));
    }
  }, [isLoaded, userId, redirectUrl, router]);

  return (
    <AuthWrapper
      title={
        signIn?.[0] === "verifications"
          ? "Verify your email"
          : "Welcome back 👋🏽"
      }
      subtitle={
        signIn?.[0] === "verifications"
          ? "To continue to mongerTrading, please enter the OTP sent to your email"
          : "Please enter your details to log in to your account"
      }
    >
      {isCallback ? (
        <div className="w-full md:w-[469px] flex justify-center items-center">
          <Loader color="#fff" />
        </div>
      ) : (
        <SignIn.Root
          fallback={
            <div className="w-full flex justify-center items-center">
              <Loader color="#fff" />
            </div>
          }
        >
          <SignIn.Step name="start" className="w-full">
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <div className="space-y-4">
              <ClerkInput
                identifier="emailAddress"
                label="Email"
                type="email"
                required
              />
              <ClerkInput
                identifier="password"
                label="Password"
                type="password"
                required
              />
            </div>

            <div className="flex flex-col space-y-4 mb-6 mt-10">
              <ClerkAuthButton
                title="Log in your account"
                ActionComponent={SignIn.Action}
              />
              <Clerk.Connection
                name="google"
                className="flex tex-base item border-[1px] text-white border-[#fff] border-opacity-20 bg-[#011627] w-full py-3 justify-center items-center gap-2 rounded-full"
              >
                <Clerk.Icon />
                Sign in with Google
              </Clerk.Connection>
            </div>
            <p className="text-center w-full text-sm text-black flex items-center justify-center gap-2">
              Don&apos;t have an account?
              <Link
                href="/auth/sign-up"
                className="font-medium underline-offset-4 underline text-[#4B24CD] outline-none hover:text-zinc-700 focus-visible:underline"
              >
                Create one here
              </Link>
            </p>
          </SignIn.Step>

          <SignIn.Step name="verifications" className="w-full">
            <div className="space-y-6 mb-10">
              <SignIn.Strategy name="email_code">
                <ClerkInput
                  identifier="code"
                  label="Email OTP"
                  type="otp"
                  required
                />
                <Clerk.FieldError className="block text-sm text-red-400" />
              </SignIn.Strategy>
            </div>
            <div className="flex flex-col space-y-4 mb-6">
              <ClerkAuthButton
                title="Verify your email"
                ActionComponent={SignIn.Action}
              />
            </div>
          </SignIn.Step>
        </SignIn.Root>
      )}
    </AuthWrapper>
  );
}
