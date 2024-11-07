"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import ClerkAuthButton from "@/app/components/clerk/AuthButton";
import AuthWrapper from "@/app/components/clerk/AuthWrapper";
import ClerkInput from "@/app/components/clerk/Input";
import Loader from "@/app/components/ui/Loader";

export default function SignUpPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isVerify = pathname.split("/").includes("verify");
  const isCallback = pathname.split("/").includes("sso-callback");

  const { isLoaded, userId } = useAuth();

  const redirectUrl = searchParams.get("redirect_url");

  useEffect(() => {
    if (isLoaded && userId && redirectUrl) {
      router.push(decodeURIComponent(redirectUrl));
    }
  }, [isLoaded, userId, redirectUrl, router]);

  return (
    <AuthWrapper
      title={isVerify ? "Verify your email" : "Create your account!"}
      subtitle={
        isVerify
          ? "To continue to stitchwell, please enter the OTP sent to your email"
          : "Please enter your details to create your account "
      }
    >
      {isCallback ? (
        <div className="w-full md:w-[469px] flex justify-center items-center">
          <Loader color="#fff" />
        </div>
      ) : (
        <SignUp.Root
          fallback={
            <div className="w-full flex justify-center items-center">
              <Loader color="#fff" />
            </div>
          }
        >
          <SignUp.Step name="start" className="w-full">
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

            <div className="mt-2 mb-10 flex items-center gap-1">
              <span className="text-black text-sm">
                I agree to the{" "}
                <Link
                  className="text-[#4B24CD]"
                  href="https://mongertrading.com/policy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  className="text-[#4B24CD]"
                  href="https://mongertrading.com/terms"
                  target="_blank"
                >
                  Terms & Conditions.
                </Link>
              </span>
            </div>
            <div className="flex flex-col space-y-4 mb-6">
              <ClerkAuthButton
                title="Create your account"
                ActionComponent={SignUp.Action}
              />
              <Clerk.Connection
                name="google"
                className="flex tex-base item border-[1px] text-white border-[#fff] border-opacity-20 bg-[#011627] w-full py-3 justify-center items-center gap-2 rounded-full"
              >
                <Clerk.Icon />
                Sign up with Google
              </Clerk.Connection>
            </div>
            <p className="text-center w-full text-sm text-black flex items-center justify-center gap-2">
              Already have an account?
              <Link
                href="/auth/sign-in"
                className="font-medium underline-offset-4 underline text-[#4B24CD] outline-none hover:text-zinc-700 focus-visible:underline"
              >
                Sign in
              </Link>
            </p>
          </SignUp.Step>

          <SignUp.Step name="verifications" className="w-full">
            <div className="space-y-6 mb-10">
              <SignUp.Strategy name="email_code">
                <ClerkInput
                  identifier="code"
                  label="Email OTP"
                  type="otp"
                  required
                />
                <Clerk.FieldError className="block text-sm text-red-400" />
              </SignUp.Strategy>
            </div>
            <div className="flex flex-col space-y-4 mb-6">
              <ClerkAuthButton
                title="Verify your email"
                ActionComponent={SignUp.Action}
              />
            </div>
          </SignUp.Step>

          <SignUp.Step name="continue" className="w-full">
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <div className="space-y-6 mb-10">
              <ClerkInput
                identifier="firstName"
                label="First Name"
                type="text"
                required
              />
              <ClerkInput
                identifier="lastName"
                label="Last Name"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col space-y-4 mb-6">
              <ClerkAuthButton
                title="Complete account Sign up"
                ActionComponent={SignUp.Action}
                isChecked={true}
              />
            </div>
          </SignUp.Step>
        </SignUp.Root>
      )}
    </AuthWrapper>
  );
}
