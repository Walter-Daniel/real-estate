'use client';

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon, User2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { logoutAction } from '@/actions/auth/logout';

export const UserNavbar = () => {
    const user = useCurrentUser();
    const onClick = () => {
        logoutAction()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-md border border-stone-500 px-2 py-2 flex items-center gap-x-3 shadow-md'>
                    <MenuIcon className='w-5 h-5' />
                    {
                        user?.image ? (
                            <Image
                                src={user.image}
                                alt='user image'
                                width={25}
                                height={25}
                                className='h-auto rounded-full'
                            />
                        ) : <User2 className='w-5 h-5' />
                    }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    user ? (
                        <>
                                <DropdownMenuItem>
                                <Link href="#">
                                    Favoritos
                                </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <Link href="#">
                                    Mis propiedades
                                </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <Link href="#">
                                    Mis reservaciones
                                </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={onClick}>
                                    Salir
                                </DropdownMenuItem>
                        </>

                    ) : (
                        <>
                            <DropdownMenuItem>
                                <Link href='/auth/login'>Iniciar sesión</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href='/auth/register'>Registrarse</Link>
                            </DropdownMenuItem>
                        </>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
