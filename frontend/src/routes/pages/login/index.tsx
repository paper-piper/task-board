import { useState } from "react";
import { Tab } from "./types";
import { Header } from "@/components/layout/Header";
import { BrandPanel } from "./components/BrandPanel";
import { AuthPanel } from "./components/auth/AuthPanel";

export function Login() {
    const [tab, setTab] = useState<Tab>("signin");
    return (
        <div className="font-body flex min-h-screen w-screen flex-col bg-[#f3f3f1] text-[#15171a]">
            <Header />

            <div className="flex flex-1 items-stretch justify-center px-6 py-14">
                <div className="grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-[20px] border border-[#e3e2de] bg-white shadow-[0_1px_2px_rgba(20,20,20,0.04),0_8px_24px_-12px_rgba(20,20,20,0.1)] md:grid-cols-[0.78fr_1fr]">
                    <BrandPanel />
                    <AuthPanel tab={tab} setTab={setTab} />
                </div>
            </div>
        </div>
    );
}
