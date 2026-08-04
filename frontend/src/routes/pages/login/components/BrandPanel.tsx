import { useBoardTemplate } from "@/hooks/board/useBoardTemplates";

export function BrandPanel() {
    const { data: boards } = useBoardTemplate();
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
                    Sign in and pick the board you want to open. Every board is
                    shared across the workspace — no need to hunt for the right
                    owner.
                </p>
            </div>

            <div className="relative z-10 flex gap-[22px] border-t border-white/20 pt-5">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-white/70">
                        Active boards
                    </span>
                    <span className="text-[15px] font-bold">
                        {boards ? boards.length : 0}
                    </span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-white/70">
                        Open tasks
                    </span>
                    <span className="text-[15px] font-bold">
                        {boards
                            ? boards.reduce((sum, curr) => {
                                  return sum + curr.task_count;
                              }, 0)
                            : 0}
                    </span>
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
