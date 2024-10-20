"use client"

import * as React from "react"
import Image from "next/image"
import { UserNavbar } from "./UserButtonNavbar"
import { Search } from "./Search"
import Link from "next/link"

export const Navbar = () => {
    return (
        <div className="flex justify-between px-6 py-2 md:items-center shadow-md fixed top-0 w-full z-10 bg-background">
            <Link href={'/'}>
            <Image
                    src="/logo.png"
                    width={150}
                    height={150}
                    alt="Logo"
                    className="h-auto mr-1"
                />
            </Link>
            <Search />
            <UserNavbar />
        </div>
    )
}
