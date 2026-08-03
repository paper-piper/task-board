import { useState } from "react";
import { Field } from "../shared/Field";
import { PasswordInput } from "../shared/PasswordInput";
import { BoardField } from "./BoardField";
import { useRegister } from "@/hooks/auth/useRegister";
import { useBoardStore } from "@/store/boardStore";
import { ErrorStatuses } from "@/shared/types/error";

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setconfirmedPassword] = useState("");
    const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
    const { mutate: register, isPending } = useRegister();
    const setError = useBoardStore((state) => state.setError);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedBoard) return;
        if (password.length < 6 || confirmedPassword != password) {
            setError(ErrorStatuses.AuthError);
            return;
        }
        register({ email, password, board_template_id: selectedBoard });
    }
    return (
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            <Field label="Email">
                <input
                    type="email"
                    value={email}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="input-field"
                    onChange={(e) => setEmail(e.target.value)}
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
            <Field label="Confirm password">
                <PasswordInput
                    value={confirmedPassword}
                    onChange={setconfirmedPassword}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
            </Field>

            <BoardField
                selectedBoard={selectedBoard}
                onSelect={setSelectedBoard}
                hint="You'll land here after creating your account. Any teammate can open the same board."
            />

            <button
                type="submit"
                disabled={!selectedBoard || isPending}
                className="mt-1 rounded-lg bg-[#6f938e] px-5 py-3 text-[14.5px] font-bold text-white transition-colors hover:enabled:bg-[#587876] disabled:cursor-not-allowed disabled:bg-[#aeb2ac]"
            >
                {isPending ? "Creating account..." : "Create account"}
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
