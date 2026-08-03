import { useState } from "react";

export function PasswordInput({
    value,
    onChange,
    placeholder,
    autoComplete,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    autoComplete: string;
}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
