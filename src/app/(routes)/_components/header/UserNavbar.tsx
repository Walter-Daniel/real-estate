'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon, User2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { logoutAction } from '@/actions/auth/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const UserNavbar = () => {
    const user = useCurrentUser();
    console.log({user})
    console.log('aaaaaaaaaaaaaaa');
    const onClick = () => {
        logoutAction();
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
                        <DropdownMenuItem onClick={onClick}>
                            Salir
                        </DropdownMenuItem>

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
