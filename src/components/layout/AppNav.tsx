"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/movimientos", label: "Movimientos" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center gap-6">
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
