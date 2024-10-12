import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PropertiesContent from "./components/PropertiesContent";

export default async function MyPropertiesPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const userId = session.user.id!;
  return (
    <div className="container mx-auto py-6 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Mis propierdades</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <PropertiesContent userId={userId} />
      </Suspense>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 pt-4">
      <Skeleton className="h-8 max-w-sm" />
      <Skeleton className="h-[80vh] w-full" />
    </div>
  );
}
