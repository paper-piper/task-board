import { motion } from "framer-motion";
import { CompletedIcon } from "../../ui/Icons";
import { SelectionStatuses, type SelectionStatus } from "@/types";

export function CardSelector({
  status,
  onPress,
}: {
  status: SelectionStatus;
  onPress: () => void;
}) {
  if (status === SelectionStatuses.Completed) {
    return <CompletedButton />;
  }

  return (
    <button
      onClick={onPress}
      onPointerDown={(e) => e.stopPropagation()}
      className="ml-auto pr-2 pt-2"
    >
      {status === SelectionStatuses.Selected ? (
        <SelectedButton />
      ) : (
        <UnselectedButton />
      )}
    </button>
  );
}

function UnselectedButton() {
  return <span className="block h-5 w-5 rounded-full border border-gray-800" />;
}

function SelectedButton() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-800">
      <span className="block h-3.5 w-3.5 rounded-full bg-gray-800" />
    </span>
  );
}
const appearIn = {
  start: { scale: 0.2, rotate: -180 },
  middle: {
    scale: 2,
    rotate: -45,
  },
  end: {
    scale: 1,
    rotate: 0,
  },
};

function CompletedButton() {
  return (
    <motion.span
      className="ml-auto pr-2 pt-2"
      variants={appearIn}
      initial="start"
      animate={["middle", "end"]}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full">
        <CompletedIcon />
      </span>
    </motion.span>
  );
}
