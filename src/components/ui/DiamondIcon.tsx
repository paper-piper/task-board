export function DiamondIcon({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7751 5H10.0401H9.91966H6.18472L3.33331 8.53414L9.99998 15.7631L16.6666 8.53414L13.7751 5Z"
          stroke="currentColor"
          stroke-miterlimit="10"
        />
        <path
          d="M6.18475 5L10 15.6827"
          stroke="currentColor"
          stroke-miterlimit="10"
        />
        <path
          d="M13.7751 5L10.1205 15.4819"
          stroke="currentColor"
          stroke-miterlimit="10"
        />
        <path
          d="M3.37347 8.49396H16.5863"
          stroke="currentColor"
          stroke-miterlimit="10"
        />
        <path
          d="M10 5.04016L12.49 8.37349"
          stroke="currentColor"
          stroke-miterlimit="10"
        />
        <path
          d="M9.91965 5.12048L7.55017 8.33333"
          stroke="currentColor"
          stroke-miterlimit="10"
        />
      </svg>
    </svg>
  );
}
