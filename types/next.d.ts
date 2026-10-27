declare module "next/navigation" {
  export function usePathname(): string;
  export function useRouter(): {
    push(href: string): void;
    replace(href: string): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(href: string): void;
  };
  export function useSearchParams(): URLSearchParams;
}

declare module "next/link" {
  import type { ComponentProps, ComponentType } from "react";
  const Link: ComponentType<ComponentProps<"a"> & { href: string }>;
  export default Link;
}
