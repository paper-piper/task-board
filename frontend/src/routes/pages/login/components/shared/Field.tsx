export function Field({
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
