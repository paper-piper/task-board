import { motion, type Variants } from "framer-motion";
import { CompletedIcon } from "@/assets/icons/completedIcon";

const completedSequence: Variants = {
  start: { scale: 0.2, rotate: -180 },
  middle: {
    scale: 1,
    rotate: -45,
  },
  end: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 8,
    },
  },
};

export function CompletedButton() {
  return (
    <motion.span
      className="ml-auto pr-2 pt-2"
      variants={completedSequence}
      initial="start"
      animate={["middle", "end"]}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full">
        <CompletedIcon />
      </span>
    </motion.span>
  );
}
