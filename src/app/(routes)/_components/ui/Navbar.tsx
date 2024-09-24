"use client"

import * as React from "react"
import Image from "next/image"
import { UserNavbar } from "./UserButtonNavbar"
import { Search } from "./Search"

export const Navbar = () => {
    return (
        <div className="flex justify-between px-6 py-2 md:items-center shadow-md fixed top-0 w-full z-10 bg-background">
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
                <Search />
            </div>
            <div className="flex gap-2 pr-4">
                <UserNavbar />
            </div>
        </div>
    )
}
