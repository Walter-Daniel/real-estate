'use client';

import { logoutAction } from '@/actions/auth/logout';
import React from 'react';

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {

    const onClick = () => {
        logoutAction();
    }

  return (
    <span onClick={onClick} className='cursor-po'>
        {children}
    </span>
  )
}
