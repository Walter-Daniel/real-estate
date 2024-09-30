
import { FormLocation } from "@/app/(routes)/_components";

export default function AddressPage() {

  return (
    <div>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">Dónde está ubicada tu propiedad?</h2>
      </div>
      <FormLocation />
    </div>
  );
}