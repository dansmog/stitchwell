"use client";

import dynamic from "next/dynamic";

const Overview = dynamic(() => import("@/app/components/screens/overview"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="">
      <Overview />
    </div>
  );
}
