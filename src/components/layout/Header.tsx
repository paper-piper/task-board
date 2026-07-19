import { useEffect, useState } from "react";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";

export function Header() {
  return (
    <div className="relative z-10 flex h-12 w-screen items-center bg-white shadow shadow-gray-400">
      <LeftSection />
      <RightSection />
    </div>
  );
}

function LeftSection() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span className="text-2xl font-bold">PMZone</span>
      <span className="ml-5">{time.toLocaleTimeString("en-GB")}</span>
    </>
  );
}

function RightSection() {
  return (
    <div className="ml-auto flex items-center">
      <span className="mr-5">Maya Avarhm</span>
      <span className="inline-flex aspect-square items-center justify-center rounded-full bg-purple-400 p-2 text-white">
        MA
      </span>
      <ArrowIcon />
    </div>
  );
}
