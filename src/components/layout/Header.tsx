import { ArrowIcon } from "@/components/ui/Icons";

export function Header() {
  return (
    <div className="relative z-10 flex h-12 w-screen items-center bg-white shadow shadow-gray-400">
      <LeftSection />
      <RightSection />
    </div>
  );
}

function LeftSection() {
  return (
    <>
      <span className="text-2xl font-bold">PMZone</span>
      <span className="ml-5">01:23:22</span>
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
