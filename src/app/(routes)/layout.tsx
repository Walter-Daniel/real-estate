import type { Metadata } from 'next';
import { Navbar } from './_components';

export const metadata: Metadata = {
  title: "Real Estate | Purple.dev",
  description: "Generated by Walter Daniel Carrizo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Navbar />
        <div className='mt-20'>
          {children}
        </div>
      </>
  );
}

export const runtime = 'nodejs'
