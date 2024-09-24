import { FormCategory } from "@/app/(routes)/_components";

export default function StructurePage() {
  return (
    <>
      <div className="w-3/5 m-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Describe tu propiedad
        </h2>
      </div>
      <FormCategory />
    </>
  );
}