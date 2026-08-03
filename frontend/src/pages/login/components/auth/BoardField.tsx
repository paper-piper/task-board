import { BoardMetadata } from "@/shared/types/Board";
import { useBoardTemplate } from "@/hooks/auth/useBoardTemplates";

export function BoardField({
    selectedBoard,
    onSelect,
    hint,
}: {
    selectedBoard: string | null;
    onSelect: (tag: string) => void;
    hint?: string;
}) {
    const { data: boards } = useBoardTemplate();
    if (!boards) return <></>;
    return (
        <div className="mt-0.5 border-t border-[#e3e2de] pt-4">
            <label className="mb-2.5 block text-[13px] text-[#82877f]">
                Board
            </label>
            <div className="flex max-h-[186px] flex-col gap-2 overflow-y-auto pr-0.5">
                {boards.map((board) => (
                    <BoardRow
                        key={board.id}
                        board={board}
                        selected={selectedBoard === board.id}
                        onClick={() => onSelect(board.id)}
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
    board: BoardMetadata;
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
            <span className="w-2/5 flex-shrink-0 rounded-md border border-[#6f938e] bg-[#e9f0ee] px-1.5 py-0.5 text-[11.5px] font-bold text-[#587876]">
                {board.id}
            </span>
            <span className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-bold text-[#15171a]">
                    {board.name}
                </p>
                <div className="flex justify-between">
                    <span className="mt-0.5 block text-[11.5px] text-[#82877f]">
                        {board.task_count} tasks
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-[#82877f]">
                        ${board.budget}
                    </span>
                </div>
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
