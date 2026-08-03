import { Tab } from "../../types";
import { SignInForm } from "./SignInForm";
import { RegisterForm } from "./RegisterForm";

export function AuthPanel({
    tab,
    setTab,
}: {
    tab: Tab;
    setTab: (tab: Tab) => void;
}) {
    return (
        <div className="flex flex-col justify-center px-6 py-9 md:px-11">
            <h2 className="font-display mb-5 text-[23px] font-semibold">
                {tab === "signin"
                    ? "Sign in to PMZone"
                    : "Create your PMZone account"}
            </h2>

            <div className="mb-[22px] flex w-fit rounded-full border border-[#e3e2de] bg-[#f3f3f1] p-1">
                <TabButton
                    active={tab === "signin"}
                    onClick={() => setTab("signin")}
                >
                    Sign in
                </TabButton>
                <TabButton
                    active={tab === "register"}
                    onClick={() => setTab("register")}
                >
                    Create account
                </TabButton>
            </div>

            {tab === "signin" ? (
                <SignInForm onSwitch={() => setTab("register")} />
            ) : (
                <RegisterForm onSwitch={() => setTab("signin")} />
            )}
        </div>
    );
}

function TabButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active
                    ? "bg-white text-[#15171a] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "text-[#82877f]"
            }`}
        >
            {children}
        </button>
    );
}
