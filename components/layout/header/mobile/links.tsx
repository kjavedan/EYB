"use client";

import { motion } from "framer-motion";
import { MenuItem } from "./menu-item";
import { useNavConfig } from "../nav-config";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Links = ({ toggleOpen }: { toggleOpen: () => void }) => {
  const navConfig = useNavConfig();

  return (
    <motion.ul
      variants={variants}
      className="w-100% pt-20 flex flex-col gap-2 px-8"
    >
      {navConfig.map((item) => (
        <MenuItem
          key={item.id}
          label={item.label}
          link={item.link}
          toggleOpen={toggleOpen}
        />
      ))}
    </motion.ul>
  );
};
