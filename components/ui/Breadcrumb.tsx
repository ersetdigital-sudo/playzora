"use client";

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://playzora.store${item.href}` } : {}),
    })),
  };
}

export function Breadcrumb({ items, className = "" }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <ol className={`flex flex-wrap items-center gap-2 text-[12.5px] text-muted ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">&rsaquo;</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition">{item.label}</Link>
          ) : (
            <span className="text-white/80" aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
