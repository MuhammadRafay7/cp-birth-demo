"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowElbowDownRight, CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/format";
import { ctaLabel, siteConfig, type NavItem } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

function pathOf(href: string) {
  return href.split("#")[0];
}

function isActive(pathname: string, item: NavItem) {
  const paths = [item.href, ...(item.children ?? []).map((child) => child.href)].map(pathOf);
  return paths.some((path) => (path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`)));
}

const topLinkClass = cn(
  "relative py-2 text-[15px] font-medium text-brand-forest transition-colors duration-200 hover:text-brand-forest-deep",
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-sage after:transition-transform after:duration-300",
);

function ServicesMenu({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  const focusItem = (index: number) => {
    const links = rootRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]");
    if (!links?.length) return;
    links[(index + links.length) % links.length].focus();
  };

  const onButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(true);
    requestAnimationFrame(() => focusItem(0));
  };

  const onPanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const links = Array.from(rootRef.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]") ?? []);
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    focusItem(current + (event.key === "ArrowDown" ? 1 : -1));
  };

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && openNow()}
      onPointerLeave={(event) => event.pointerType === "mouse" && closeSoon()}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
        className={cn(
          topLinkClass,
          "inline-flex items-center gap-1.5",
          active || open ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
        )}
      >
        {item.label}
        <CaretDown
          size={14}
          weight="bold"
          aria-hidden
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            onKeyDown={onPanelKeyDown}
            className="absolute left-1/2 top-full z-50 w-[23rem] -translate-x-1/2 pt-4"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease }}
          >
            <ul className="rounded-card border border-line bg-white p-2 shadow-lift">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    data-menu-item
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 transition-colors hover:bg-brand-cream focus-visible:bg-brand-cream",
                      child.nested ? "-mt-1 flex items-center gap-2 py-2 pl-6 text-sm font-medium text-brand-forest" : "py-3",
                    )}
                  >
                    {child.nested ? (
                      <>
                        <ArrowElbowDownRight size={14} aria-hidden className="text-brand-sage" />
                        {child.label}
                      </>
                    ) : (
                      <>
                        <span className="block text-[15px] font-medium text-ink">{child.label}</span>
                        {child.description && (
                          <span className="mt-0.5 block text-sm text-ink-muted">{child.description}</span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    desktop.addEventListener("change", close);
    window.addEventListener("keydown", onKey);
    return () => {
      desktop.removeEventListener("change", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo onClick={() => setMenuOpen(false)} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item);
              if (item.children) return <ServicesMenu key={item.href} item={item} active={active} />;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(topLinkClass, active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="max-sm:hidden">
            {ctaLabel}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-brand-forest transition-colors hover:bg-brand-cream lg:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id={menuId}
            aria-label="Mobile"
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="container-page py-3">
              <ul className="divide-y divide-line">
                {siteConfig.nav.map((item) => (
                  <li key={item.href} className="py-4">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="block font-serif text-2xl text-ink aria-[current=page]:text-brand-forest"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="mt-3 space-y-1 border-l border-brand-sage/50 pl-4">
                        {item.children
                          .filter((child) => child.href !== item.href)
                          .map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                  "block py-1.5 text-brand-forest",
                                  child.nested ? "pl-4 text-sm text-ink-muted" : "text-[17px]",
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact" onClick={() => setMenuOpen(false)} className="mb-3 mt-5 w-full sm:hidden">
                {ctaLabel}
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
