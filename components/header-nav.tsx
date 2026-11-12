"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TechnologiesDropdown from "./technologies-dropdown";

export interface HeaderNavProps {
  activeNav?: "need-a-solution" | "faq";
}

export default function HeaderNav({ activeNav }: HeaderNavProps) {
  const pathname = usePathname() || "";
  const isTechActive = pathname.startsWith("/technologies");
  const isHowWeBuildActive =
    activeNav === "need-a-solution" || pathname.startsWith("/need-a-solution");
  const isFaqActive = activeNav === "faq" || pathname.startsWith("/faq");

  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      <TechnologiesDropdown isActive={isTechActive} />
      <Link
        href="/need-a-solution"
        aria-current={isHowWeBuildActive ? "page" : undefined}
      >
        How we build
      </Link>
      <Link href="/faq" aria-current={isFaqActive ? "page" : undefined}>
        FAQ
      </Link>
    </nav>
  );
}

