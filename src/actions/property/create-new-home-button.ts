'use server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const createNewHomeButton = async ({ userId }: { userId: string }) => {
    console.log({userId})
}