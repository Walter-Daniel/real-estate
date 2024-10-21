import { getFavoritesByUser } from "@/actions/favorite";
import Link from "next/link";
import { FavoriteTable } from "./FavoriteTable";

export const FavoritesContent = async({userId}:{userId: string}) => {
    const favorites = await getFavoritesByUser(userId);

 

    if(favorites.length > 0){
      return <FavoriteTable favorites={favorites}/>
    }else {
      return <Empty />
    }
  
}

function Empty() {
    return (
      <div className="pt-2">
        <p>Lista vacía. Por favor, agrega una propiedad como favorita.</p>
        <Link href='/' className="underline">Regresar al inicio</Link>
      </div>
    )
  }