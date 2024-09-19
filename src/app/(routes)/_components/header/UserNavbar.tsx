import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon, User2 } from 'lucide-react';

export const UserNavbar = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-md'>
                <div className='rounded-md border px-2 py-2 flex items-center gap-x-3 bg-primary text-white'>
                    <MenuIcon className='w-5 h-5'/>
                    <User2 className='w-5 h-5'/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    Iniciar sesión
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Registrarse
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
