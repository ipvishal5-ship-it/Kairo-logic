declare module "next/navigation" {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useSearchParams(): any;
}

declare module "next/link" {
  import { ComponentProps, ComponentType } from "react";
  const Link: ComponentType<ComponentProps<"a"> & { href: string }>;
  export default Link;
}
