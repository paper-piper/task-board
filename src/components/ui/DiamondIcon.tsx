export function DiamondIcon({ size = 26, className }: { size?: number; className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
        >
            <path d="M6 4H18L22 9L12 21L2 9L6 4Z" />
            <path d="M2 9H22" />
            <path d="M6 4L9 9L12 21" />
            <path d="M18 4L15 9L12 21" />
            <path d="M9 9L12 4L15 9" />
        </svg>
    );
}
