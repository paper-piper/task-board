import { motion, type Variants } from "framer-motion";
import { CompletedIcon } from "@/assets/icons/completedIcon";

const appearIn: Variants = {
    start: { scale: 0.5 },
    middle: {
        scale: 2,
    },
    end: {
        scale: 1,
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
