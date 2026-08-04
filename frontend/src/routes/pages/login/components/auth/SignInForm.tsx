import { useState } from "react";
import { Field } from "../shared/Field";
import { PasswordInput } from "../shared/PasswordInput";
import { BoardField } from "./BoardField";
import { useLogin } from "@/hooks/auth/useLogin";
import { useBoardStore } from "@/boardStore";
import { ErrorStatuses } from "@/shared/types/error";

export function SignInForm({ onSwitch }: { onSwitch: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
    const { mutate: login, isPending } = useLogin();
    const setError = useBoardStore((state) => state.setError);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedBoard) return;
        login({ email, password, board_template_id: selectedBoard });
    }
    return (
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            <Field label="Email">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="input-field"
                />
            </Field>
            <Field label="Password">
                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
            </Field>

            <BoardField
                selectedBoard={selectedBoard}
                onSelect={setSelectedBoard}
            />

            <button
                type="submit"
                disabled={!selectedBoard || isPending}
                className="mt-1 rounded-lg bg-[#6f938e] px-5 py-3 text-[14.5px] font-bold text-white transition-colors hover:enabled:bg-[#587876] disabled:cursor-not-allowed disabled:bg-[#aeb2ac]"
            >
                {isPending ? "Signing in..." : "Sign in"}
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
