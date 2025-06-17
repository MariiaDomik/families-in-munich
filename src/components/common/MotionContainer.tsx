import { motion, AnimatePresence } from "framer-motion"

interface MotionContainerProps {
    key: string;
    children: React.ReactNode;
}

export default function MotionContainer({ key, children }: MotionContainerProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}