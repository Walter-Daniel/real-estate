
export default function CreateLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="pt-10">
      {children}
    </div>
  );
}