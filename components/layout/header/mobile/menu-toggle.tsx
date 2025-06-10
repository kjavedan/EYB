"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => (
  <button
    className="relative w-10 h-10 z-50 flex items-center justify-center rounded-full outline-none border-none cursor-pointer"
    onClick={toggle}
    aria-label="Toggle menu"
  >
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center"
    >
      <Icon
        icon={isOpen ? "mingcute:close-fill" : "mingcute:menu-fill"}
        className="w-6 h-6 text-black"
      />
    </motion.div>
  </button>
);
