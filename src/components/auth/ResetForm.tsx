'use client';

import { useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetFormAction } from '@/actions/reset-form';
import { Mail } from 'lucide-react';

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
import { resetFormSchema } from '@/schemas/auth.schema';
import { ErrorMessage } from '@/components/messages';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
  

export const ResetForm = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const form = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = (values: z.infer<typeof resetFormSchema>) => {
    startTransition(async() => {
      const { ok, message } = await resetFormAction(values);
      if(!ok){
        setError(message)
        setSuccess('');
      }else{
        setError('');
        setSuccess(message);
        setIsDialogOpen(true)
      }
    })
  };

  return (
    <CardWrapper
      headerLabel='Restablecer contraseña'
      backButtonLabel='Regresar a inicio de sesión'
      backButtonHref='/auth/register'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Introduce tu correo electónico y te enviaremos un enlace para que vuelvas a entrar a tu cuenta</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} type='email'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ErrorMessage message={error}/>
          <Button 
            type="submit" 
            className="w-full text-white"
            variant="secondary"
            disabled={isPending}
          >
            Enviar correo de restablecimiento
          </Button>
        </form>
      </Form>

       {/* Modal */}
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='w-[400px]'>
          <DialogHeader>
            <DialogTitle className='flex'>
                <Mail className='w-4 h-4 mr-2' />
                Correo enviado!
            </DialogTitle>
            <DialogDescription>
              {success}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </CardWrapper>
  )
}
