import { FormHomeAddress } from "@/app/(routes)/_components";

export default function AddressPage({params}: {params: {id: string}}) {

  return (
    <div className="mb-36">
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">Dónde está ubicada tu propiedad?</h2>
      </div>
      <FormHomeAddress homeId={params.id}/>
    </div>
  );
}