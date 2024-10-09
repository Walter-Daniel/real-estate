import { getFavoritesByUser } from "@/actions/favorite";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
    const session = await auth();
    if(!session || !session.user){
        redirect('/');
    }
    const userId = session.user.id!;
    const favorites = await getFavoritesByUser(userId);
    console.log({favorites})
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}