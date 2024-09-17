'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { BeatLoader } from 'react-spinners';

import { CardWrapper } from './CardWrapper';
import { emailVerification } from '@/actions/email-verification';
import { ErrorMessage, SuccessMessage } from '../messages';

export const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();


    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(!token){
            setError("No hay token");
            return null;
        }

        emailVerification(token)
            .then(({ok, message}) => {
                (!ok) ? setError(message) : setSuccess(message);
            })
            .catch(() => {
                setError('Algo salió mal.')
            })
    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])
    

  return (
    <CardWrapper
        headerLabel='Validando tu correo'
        backButtonLabel='Regresar a inicio de sesión'
        backButtonHref='/auth/login'
    >
        <div className='flex items-center w-full justify-center'>
            {!success && !error && <BeatLoader />}
            {success && <SuccessMessage message={success}/>}
            {error && <ErrorMessage message={error}/>}
        </div>
    </CardWrapper>
  )
}
