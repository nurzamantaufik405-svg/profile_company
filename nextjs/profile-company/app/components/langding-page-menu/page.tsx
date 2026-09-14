"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
   
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
   
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
   
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
   
  },
]

export default function Menulandingpage() {
  return (
    <div className="flex items-center gap-4 w-full px-4 py-2 bg-blue-500 border-b border-blue-600">
      <Image
        className="h-5 w-[100px]"
        src="/img/smk_mvp_ars_logo_white.png.png"
        alt="SMK MVP ARS Logo"
        width={100}
        height={20}
        priority
      />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>jurusan</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
