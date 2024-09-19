import Image from 'next/image';

interface HeaderProps {
    label: string;
}

export const Header = ({ label }:HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <h1 className='text-3xl font-bold flex items-center mr-2'>
                <Image 
                  src="/logo.png"
                  alt='auth'
                  width={50}
                  height={50}
                  className='h-auto'
                />
                Valles.tuc
        </h1>
        <p className='text-muted-foreground text-sm'>
            {label}
        </p>
    </div>
  )
}
