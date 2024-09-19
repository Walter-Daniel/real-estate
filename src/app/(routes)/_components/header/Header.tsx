"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { useTheme } from "next-themes"

import Image from "next/image"
import Link from "next/link"
import { navbarLinks } from "./linkNavbar"
import { usePathname } from "next/navigation"
import { UserNavbar } from "./UserNavbar"

export const Header = () => {
    const path = usePathname();
    return (
        <div className="flex justify-between px-4 py-2 md:items-center shadow-md fixed top-0 w-full z-10 bg-background">
            <div className="flex items-center">
                <Image
                    src="/logo.png"
                    width={50}
                    height={50}
                    alt="Logo"
                    className="h-auto mr-1 text-red-500"
                />
                <span className="font-bold">Valles.tuc</span>

            </div>
            <div>
                <ul className="hidden md:flex md:ml-4 gap-10">
                    {
                        navbarLinks.map(link => (
                            <Link
                                href={link.url}
                                key={link.url}
                                className={`font-medium text-sm hover:text-primary 
                                ${path === link.url && 'text-primary'}`}
                            >
                                {link.title}
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className="flex gap-2">
                <UserNavbar />
            </div>
        </div>
    )
}
