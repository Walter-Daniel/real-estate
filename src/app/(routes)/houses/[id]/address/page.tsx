import { FormHomeAddress } from "./ui/FormHomeAddress";

export default function AddressPage({params}: {params:{id: string}}) {
  console.log(params.id)
  return (
    <div className="mb-16">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">Dónde está ubicada tu propiedad?</h2>
      </div>
      <FormHomeAddress houseId={params.id}/>
    </div>
  );
}