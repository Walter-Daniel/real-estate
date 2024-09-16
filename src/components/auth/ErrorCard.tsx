import React from 'react';
import { Header } from './Header';
import { BackButton } from './BackButton';
import { Card, CardFooter, CardHeader } from '../ui';


export const ErrorCard = () => {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label='Ups! Algo salió mal!'/>
        </CardHeader>
        <CardFooter>
            <BackButton 
                label='Regresar a Iniciar sesión'
                href='/auth/login'
            />
        </CardFooter>
    </Card>
  )
}
