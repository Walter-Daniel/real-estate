import { FormCategory } from "@/app/(routes)/_components";

export default function StructurePage({params}: {params: {id: string}}) {
  return (
    <>
      <div className="w-3/5 m-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Cuál de estas opciones describe mejor tu casa?
        </h2>
      </div>
      <FormCategory homeId={params.id} />
    </>
  );
}