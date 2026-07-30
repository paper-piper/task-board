import { useState } from "react";
import { CompanyLogo } from "../../assets/icons/logo";

type Board = {
    tag: string;
    name: string;
    tasks: number;
    budget: number;
};

const BOARDS: Board[] = [
    { tag: "B1", name: "Web Development Project", tasks: 8, budget: 12000 },
    { tag: "B2", name: "Marketing Launch Q3", tasks: 5, budget: 7200 },
    { tag: "B3", name: "Mobile App Redesign", tasks: 11, budget: 15400 },
    { tag: "B4", name: "Internal Tools Migration", tasks: 6, budget: 3800 },
];

type Tab = "signin" | "register";

export function Login() {
    const [tab, setTab] = useState<Tab>("signin");

    return (
        <div className="flex min-h-screen w-screen flex-col bg-[#f3f3f1] font-body text-[#15171a]">
            <TopBar />

            <div className="flex flex-1 items-stretch justify-center px-6 py-14">
                <div className="grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-[20px] border border-[#e3e2de] bg-white shadow-[0_1px_2px_rgba(20,20,20,0.04),0_8px_24px_-12px_rgba(20,20,20,0.1)] md:grid-cols-[0.78fr_1fr]">
                    <BrandPanel />
                    <AuthPanel tab={tab} setTab={setTab} />
                </div>
            </div>
        </div>
    );
}

function TopBar() {
    return (
        <div className="flex items-center justify-between border-b border-[#e3e2de] bg-white px-8 py-[18px]">
            <div className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
                <CompanyLogo className="h-6 w-6" />
                PM<span className="text-[#587876]">Zone</span>
            </div>
            <div className="text-[13px] text-[#82877f]">
                Need help signing in?{" "}
                <strong className="text-[#587876]">Contact support</strong>
            </div>
        </div>
    );
}

function BrandPanel() {
    return (
        <div
            className="relative hidden flex-col justify-between overflow-hidden px-[34px] py-10 text-white md:flex"
            style={{
                background:
                    "radial-gradient(120% 140% at 8% 0%, #6a5fd6 0%, #4a63c9 34%, #2f6ea3 62%, #2d8e86 100%)",
            }}
        >
            <NodeArt />

            <div className="relative z-10">
                <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                    Project workspace
                </p>
                <h1 className="mb-3 max-w-[270px] font-display text-[27px] font-semibold leading-[1.25]">
                    One shared set of boards for the whole team.
                </h1>
                <p className="max-w-[260px] text-sm leading-[1.6] text-white/80">
                    Sign in and pick the board you want to open. Every board
                    is shared across the workspace — no need to hunt for the
                    right owner.
                </p>
            </div>

            <div className="relative z-10 flex gap-[22px] border-t border-white/20 pt-5">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-white/70">
                        Active boards
                    </span>
                    <span className="text-[15px] font-bold">4</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-white/70">
                        Open tasks
                    </span>
                    <span className="text-[15px] font-bold">30</span>
                </div>
            </div>
        </div>
    );
}

function NodeArt() {
    return (
        <svg
            className="absolute inset-0 h-full w-full opacity-90"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.2">
                <line x1="60" y1="80" x2="120" y2="150" />
                <line x1="180" y1="60" x2="120" y2="150" />
                <line x1="120" y1="150" x2="90" y2="230" />
                <line x1="120" y1="150" x2="200" y2="220" />
                <line x1="200" y1="220" x2="260" y2="170" />
                <line x1="200" y1="220" x2="230" y2="300" />
                <line x1="90" y1="230" x2="60" y2="320" />
                <line x1="230" y1="300" x2="180" y2="380" />
                <line x1="230" y1="300" x2="300" y2="360" />
                <line x1="180" y1="380" x2="150" y2="460" />
                <line x1="300" y1="360" x2="320" y2="440" />
                <line x1="150" y1="460" x2="200" y2="530" />
            </g>
            <g fill="#fff">
                <circle cx="60" cy="80" r="6" fill="#f2a154" />
                <circle cx="180" cy="60" r="5" fill="#e05d6f" />
                <circle cx="120" cy="150" r="4.5" fill="#fff" />
                <circle cx="260" cy="170" r="6" fill="#4fd1a5" />
                <circle cx="200" cy="220" r="4.5" fill="#fff" />
                <circle cx="90" cy="230" r="4.5" fill="#fff" />
                <circle cx="230" cy="300" r="4.5" fill="#fff" />
                <circle cx="60" cy="320" r="6" fill="#e05d6f" />
                <circle cx="180" cy="380" r="4.5" fill="#fff" />
                <circle cx="300" cy="360" r="6" fill="#f2c14e" />
                <circle cx="150" cy="460" r="4.5" fill="#fff" />
                <circle cx="320" cy="440" r="5" fill="#4fd1a5" />
                <circle cx="200" cy="530" r="6" fill="#f2a154" />
            </g>
        </svg>
    );
}

function AuthPanel({
    tab,
    setTab,
}: {
    tab: Tab;
    setTab: (tab: Tab) => void;
}) {
    return (
        <div className="flex flex-col justify-center px-6 py-9 md:px-11">
            <h2 className="mb-5 font-display text-[23px] font-semibold">
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

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
    const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

    return (
        <form
            className="flex flex-col gap-[15px]"
            onSubmit={(e) => e.preventDefault()}
        >
            <Field label="Email">
                <input
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="input-field"
                />
            </Field>
            <Field label="Password">
                <PasswordInput
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
            </Field>

            <div className="-mt-1.5 flex justify-end">
                <a
                    href="#"
                    className="text-[12.5px] font-semibold text-[#587876] hover:underline"
                >
                    Forgot password?
                </a>
            </div>

            <BoardField
                selectedBoard={selectedBoard}
                onSelect={setSelectedBoard}
            />

            <button
                type="submit"
                disabled={!selectedBoard}
                className="mt-1 rounded-lg bg-[#6f938e] px-5 py-3 text-[14.5px] font-bold text-white transition-colors hover:enabled:bg-[#587876] disabled:cursor-not-allowed disabled:bg-[#aeb2ac]"
            >
                Sign in
            </button>

            <div className="mt-0.5 text-center text-[13px] text-[#82877f]">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="font-bold text-[#587876] hover:underline"
                >
                    Create one
                </button>
            </div>
        </form>
    );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

    return (
        <form
            className="flex flex-col gap-[15px]"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field label="First name">
                    <input
                        type="text"
                        placeholder="Maya"
                        autoComplete="given-name"
                        className="input-field"
                    />
                </Field>
                <Field label="Last name">
                    <input
                        type="text"
                        placeholder="Avrahm"
                        autoComplete="family-name"
                        className="input-field"
                    />
                </Field>
            </div>
            <Field label="Email">
                <input
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="input-field"
                />
            </Field>
            <Field label="Password">
                <PasswordInput
                    placeholder="Create a password"
                    autoComplete="new-password"
                />
            </Field>
            <Field label="Confirm password">
                <PasswordInput
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                />
            </Field>

            <BoardField
                selectedBoard={selectedBoard}
                onSelect={setSelectedBoard}
                hint="You'll land here after creating your account. Any teammate can open the same board."
            />

            <button
                type="submit"
                disabled={!selectedBoard}
                className="mt-1 rounded-lg bg-[#6f938e] px-5 py-3 text-[14.5px] font-bold text-white transition-colors hover:enabled:bg-[#587876] disabled:cursor-not-allowed disabled:bg-[#aeb2ac]"
            >
                Create account
            </button>

            <div className="mt-0.5 text-center text-[13px] text-[#82877f]">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="font-bold text-[#587876] hover:underline"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-[#82877f]">{label}</label>
            {children}
        </div>
    );
}

function PasswordInput({
    placeholder,
    autoComplete,
}: {
    placeholder: string;
    autoComplete: string;
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="input-field pr-14"
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-1 text-xs font-semibold text-[#82877f] hover:text-[#587876]"
            >
                {visible ? "Hide" : "Show"}
            </button>
        </div>
    );
}

function BoardField({
    selectedBoard,
    onSelect,
    hint,
}: {
    selectedBoard: string | null;
    onSelect: (tag: string) => void;
    hint?: string;
}) {
    return (
        <div className="mt-0.5 border-t border-[#e3e2de] pt-4">
            <label className="mb-2.5 block text-[13px] text-[#82877f]">
                Board
            </label>
            <div className="flex max-h-[186px] flex-col gap-2 overflow-y-auto pr-0.5">
                {BOARDS.map((board) => (
                    <BoardRow
                        key={board.tag}
                        board={board}
                        selected={selectedBoard === board.tag}
                        onClick={() => onSelect(board.tag)}
                    />
                ))}
            </div>
            {hint && (
                <p className="mt-2 text-[11.5px] text-[#aeb2ac]">{hint}</p>
            )}
        </div>
    );
}

function BoardRow({
    board,
    selected,
    onClick,
}: {
    board: Board;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5 text-left transition-colors ${
                selected
                    ? "border-[#587876] shadow-[0_0_0_3px_#e9f0ee]"
                    : "border-[#e3e2de] hover:border-[#6f938e]"
            }`}
        >
            <span className="flex-shrink-0 rounded-md border border-[#6f938e] bg-[#e9f0ee] px-1.5 py-0.5 text-[11.5px] font-bold text-[#587876]">
                {board.tag}
            </span>
            <span className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-bold text-[#15171a]">
                    {board.name}
                </p>
                <span className="mt-0.5 block text-[11.5px] text-[#82877f]">
                    {board.tasks} tasks · ${board.budget.toLocaleString()}{" "}
                    budget
                </span>
            </span>
            <span
                className={`flex h-[17px] w-[17px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
                    selected
                        ? "border-[#587876] bg-[#587876]"
                        : "border-[#aeb2ac]"
                }`}
            >
                <span
                    className={`h-[7px] w-[7px] rounded-full bg-white transition-opacity ${
                        selected ? "opacity-100" : "opacity-0"
                    }`}
                />
            </span>
        </button>
    );
}
