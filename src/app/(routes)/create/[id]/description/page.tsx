import { FormHomeDescription } from "@/app/(routes)/_components";

export default function DescriptionPage() {
  return (
    <>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Describe tu casa lo mejor que puedas.
        </h2>
      </div>
      <FormHomeDescription />
    </>
  );
}