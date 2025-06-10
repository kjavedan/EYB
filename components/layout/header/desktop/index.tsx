"use client";

import Links from "./links";
import Image from "next/image";
import logoSrc from "@/assets/images/logo.png";
import LanguageSelector from "@/components/ui/language-selector";

export default function NavDesktop() {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <a href="#hero">
        <Image src={logoSrc} alt="logo" width={70} height={70} />
      </a>

      <div className="flex items-center gap-4">
        <Links />
        <LanguageSelector />
      </div>
    </div>
  );
}
