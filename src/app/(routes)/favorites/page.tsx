import { getFavoritesByUser } from "@/actions/favorite";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FavoriteTable } from "../_components/favoriteTable";

export default async function FavoritesPage() {
    const session = await auth();
    if(!session || !session.user){
        redirect('/');
    }
    const userId = session.user.id!;
    const favorites = await getFavoritesByUser(userId);
    
  return (
    <section className="container mx-auto py-6 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Favoritos</h2>
      {
        favorites.length === 0
          ? <Empty />
          : <FavoriteTable favorites={favorites}/>
      }
    </section>
  );
}

function Empty() {
  return (
    <div className="pt-2">
      <p>Lista vacía. Por favor, agrega una propiedad como favorita.</p>
      <Link href='/' className="underline">Regresar al inicio</Link>
    </div>
  )
}