'use client';

import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CardWrapper } from './CardWrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/schemas/auth.schema';
import { ErrorMessage, SuccessMessage } from '@/components/messages';
import { login } from '@/actions/auth/login';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const errorLogin = searchParams.get("error");
  const urlError = errorLogin === "OAuthAccountNotLinked"
  ? "El email ya se encuentra en uso con otro proveedor."
  : errorLogin === "OAuthCallbackError"
  ? "Se produjo un error al intentar iniciar sesión."
  : "";
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (authenticated) {
      window.location.replace("/profile");
    }
  }, [authenticated]);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async() => {
    const { ok, message } = await login(values);
    if (ok) {
      message === "Inicio de sesión exitoso!" ? setAuthenticated(true) : setSuccess(message)
    } else {
      setError(message);
      setAuthenticated(false);
    }
    })
  };

  return (
    <CardWrapper
      headerLabel='Bienvenid@s'
      backButtonLabel='No tienes una cuenta?'
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} type='email'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu contraseña..." {...field} type='password'/>
                </FormControl>
                <FormMessage />
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className='px-0 font-normal'
                >
                  <Link href="/auth/reset">
                    Has olvidado tu contraseña?
                  </Link>
                </Button>
              </FormItem>
            )}
          />
          <ErrorMessage message={error || urlError}/>
          <SuccessMessage message={success}/>
          <Button 
            type="submit" 
            className="w-full"
            variant="secondary"
            disabled={isPending}
          >
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
