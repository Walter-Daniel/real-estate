'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { registerSchema } from '@/schemas/auth.schema';
import { ErrorMessage, SuccessMessage } from '@/components/messages';
import { register } from '@/actions/register';
import { cn } from '@/lib/utils';


export const RegisterForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async() => {
      const { ok, message } = await register(values);
      if(!ok){
        setError(message)
      }else {
        setSuccess(message)
        form.reset();
      }
    })
  };

  return (
    <CardWrapper
      headerLabel='Crear una cuenta'
      backButtonLabel='Ya tienes una cuenta?'
      backButtonHref='/auth/login'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre y Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="María Lopez" {...field} type='text'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              </FormItem>
            )}
          />
          {error && (<ErrorMessage message={error}/>)}
          {success && (<SuccessMessage message={success}/>)}
          <Button 
            type="submit" 
            className={cn('w-full',{
              'bg-black hover:bg-black' : !isPending,
              'bg-gray-500' : isPending
              
            })}
          >
            Registrarse
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
