'use client';

import { useState, useTransition } from 'react';

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
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { ErrorMessage, SuccessMessage } from '@/components/messages';
import { resetPassword } from '@/actions/reset-password';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    if (!token) {
        return (
            <div className='bg-white p-4 rounded-md flex items-center'>
                <AlertTriangle className='w-5 h-5 mr-2' />
                <h2 className='font-semibold'>Error al encontrar token!</h2>
            </div>
        )
    }

    const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        startTransition(async () => {
            const { ok, message } = await resetPassword(values, token);
            if (!ok) {
                setError(message)
                setSuccess('');
            } else {
                setError('');
                setSuccess(message);
            }
        })
    };

    return (
        <CardWrapper
            headerLabel='Reestablecer tu contraseña'
            backButtonLabel='Regresar a inicio de sesión'
            backButtonHref='/auth/login'
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingresa tu contraseña..." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingresa tu contraseña..." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ErrorMessage message={error} />
                    <SuccessMessage message={success} />
                    <Button
                        type="submit"
                        className="w-full text-white"
                        variant="secondary"
                        disabled={isPending}
                    >
                        Reestablecer contraseña
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
