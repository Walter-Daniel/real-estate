import { auth } from "@/auth";
import { CreateHomeForm } from "./ui/CreateHomeForm";
import { redirect } from "next/navigation";

export default async function CreateHomePage() {
  return (
    <div className="mb-16">
      <div className="pt-4">
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Describe tu casa lo mejor que puedas.
        </h2>
      </div>
      <CreateHomeForm />
    </div>
  );
}