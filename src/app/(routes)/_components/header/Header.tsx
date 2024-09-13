"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { navbarLinks } from "./linkNavbar"
import { usePathname } from "next/navigation"

export const Header = () => {
    const path = usePathname();
    return (
        <div className="flex justify-between p-4 md:items-center shadow-md fixed top-0 w-full z-10 bg-background">
            <div className="flex items-center">
                <Image
                    src="/logo.svg"
                    width={30}
                    height={30}
                    alt="Logo"
                    className="h-auto mr-2 b"
                />
                <span className="font-bold">Purple.dev</span>

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
                {/* <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar anuncio
                </Button> */}
                <Button variant="outline">Login</Button>
            </div>
        </div>
    )
}
