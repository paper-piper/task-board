import { CompanyLogo } from "../../../assets/icons/logo";

export function TopBar() {
    return (
        <div className="flex items-center justify-between border-b border-[#e3e2de] bg-white px-8 py-[18px]">
            <div className="font-display flex items-center gap-2 text-xl font-bold tracking-tight">
                <CompanyLogo className="h-6 w-6" />
                PM<span className="text-[#587876]">Zone</span>
            </div>
        </div>
    );
}
