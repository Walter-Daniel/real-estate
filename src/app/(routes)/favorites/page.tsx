import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
import { FavoritesContent } from "./components/FavoritesContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function FavoritesPage() {
    const session = await auth();
    if(!session || !session.user){
        redirect('/');
    }
    const userId = session.user.id!;
    
  return (
    <section className="container mx-auto py-6 lg:px-10 mt-10 lg:w-3/4">
      <div className="flex items-center">
      <Link href='/' className="underline">
        <ArrowLeftCircle className=" mr-2"/>
      </Link>

      <h2 className="text-3xl font-semibold tracking-tight">Favoritos</h2>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FavoritesContent userId={userId}/>
      </Suspense> 
    </section>
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
