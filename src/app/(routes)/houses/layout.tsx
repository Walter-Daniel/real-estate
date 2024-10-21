
export default function HousesLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className='px-10 mx-auto'>
      {children}
    </div>
  );
}