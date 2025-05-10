"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  Menu,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

// Define navigation items
const navigationItems = [
  {
    title: "Contents",
    icon: LayoutDashboard,
    href: "/contents",
  },
  {
    title: "Publish",
    icon: LayoutDashboard,
    href: "/editor",
  },

  {
    title: "Users",
    icon: Settings,
    href: "/manage",
    children: [
      { title: "Create New User", href: "/create" },
      { title: "Share info", href: "/info" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    children: [
      { title: "General", href: "/settings" },
      { title: "Appearance", href: "/settings/appearance" },
    ],
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
];

export function Sidebar({ className }: { className: string }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState({});

  // Toggle submenu expansion
  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Check if a link is active
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Navigation Item component
  const NavItem = ({
    item,
    mobile = false,
  }: {
    item: any;
    mobile: Boolean;
  }) => {
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded[item.title];

    return (
      <div>
        <div
          className={cn(
            "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
            active
              ? "bg-gray-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
            mobile && "py-3",
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 flex-shrink-0",
              active
                ? "text-blue-600"
                : "text-gray-500 group-hover:text-blue-600",
            )}
          />

          <Link
            href={item.href}
            className={cn("flex-grow", hasChildren && "cursor-default")}
            onClick={(e) => hasChildren && e.preventDefault()}
          >
            {item.title}
          </Link>

          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-transparent"
              onClick={() => toggleExpand(item.title)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          )}
        </div>

        {/* Submenu */}
        {hasChildren && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive(child.href)
                    ? "bg-gray-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                )}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render sidebar content
  const SidebarContent = ({ mobile = false }) => (
    <div
      className={cn(
        "flex flex-col gap-y-4 justify-between min-h-svh",
        mobile && "py-4",
      )}
    >
      <div className="px-3 py-2">
        <Link
          href="/"
          className="flex h-10 items-center gap-x-2 rounded-md bg-purple-600 px-3 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="font-bold">MDX.CMS</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className={cn("space-y-1", mobile && "space-y-2")}>
          {navigationItems.map((item) => (
            <NavItem key={item.title} item={item} mobile={mobile} />
          ))}
        </div>
      </ScrollArea>

      <div className="mt-auto border-t px-3 py-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600">
          <LogOut className="h-5 w-5 text-gray-500" />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:relative lg:inset-y-0 lg:z-10 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-white",
          className,
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent mobile />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
