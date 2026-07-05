export function CardSelector({
  isSelected,
  onPress,
}: {
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <button onClick={onPress} className="ml-auto pr-2 pt-2">
      {isSelected ? <SelectedIcon /> : <UnselectedIcon />}
    </button>
  );
}

function UnselectedIcon() {
  return <span className="block h-5 w-5 rounded-full border border-gray-800" />;
}

function SelectedIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-800">
      <span className="block h-4 w-4 rounded-full bg-gray-800" />
    </span>
  );
}
