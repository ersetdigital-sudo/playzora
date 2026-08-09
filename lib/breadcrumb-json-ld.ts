import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";

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
