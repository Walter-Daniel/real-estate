
export default function HousesLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className='w-3/5 mx-auto'>
      {children}
    </div>
  );
}