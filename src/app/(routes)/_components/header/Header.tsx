"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { UserNavbar } from "./UserNavbar"

export const Header = () => {
    const path = usePathname();
    console.log('aaaa')
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
        
            </div>
            <div className="flex gap-2">
                <UserNavbar />
            </div>
        </div>
    )
}
