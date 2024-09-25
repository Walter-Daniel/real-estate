'use client';

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HouseIcon, MenuIcon, Notebook, PlusSquare, Star, User2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { logoutAction } from '@/actions/auth/logout';
import { ExitIcon } from '@radix-ui/react-icons';
import { createNewHomeButton } from '@/actions';
import { Button } from '@/components/ui';

export const UserNavbar = () => {
    const user = useCurrentUser();
    const onClick = () => {
        logoutAction()
    }
    const createHomeWithId = createNewHomeButton.bind(null, {
        userId: user?.id as string
    })
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
            <DropdownMenuContent className='mr-4 p-3'>
                {
                    user ? (
                        <>
                            <DropdownMenuItem>
                                <Button variant={'ghost'} onClick={() => createHomeWithId()}>
                                    Crear propiedad
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#" className='flex items-center'>
                                <HouseIcon className='w-4 h-4 mr-2'/>
                                    Mis propiedades
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#" className='flex items-center'>
                                    <Star className='w-4 h-4 mr-2'/>
                                    Favoritos
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#" className='flex items-center'>
                                <Notebook className='w-4 h-4 mr-2'/>
                                    Mis reservaciones
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onClick}>
                                <ExitIcon className='w-4 h-4 mr-2' />
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
