import { motion } from "framer-motion";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <motion.div
    initial={{ opacity: 0.5, filter: "blur(4px)" }}
    animate={{ opacity: 1, filter: "blur(0)" }}
    exit={{ opacity: 0.5 }}
    transition={{
      duration: 1,
    }}
  >
    {children}
  </motion.div>
);

export default Layout;
