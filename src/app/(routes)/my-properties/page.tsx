import { getMyProperties } from "@/actions/my-properties";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PropertiesTable } from "./ui/PropertiesTable";
import { createNewHomeButton } from "@/actions";
import { Button } from "@/components/ui";

export default async function MyPropertiesPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const userId = session.user.id!;
  const myProperties = await getMyProperties(userId);
  
  return (
    <div className="container mx-auto py-6 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Mis propierdades</h2>
      {
        ( myProperties.length > 0 )
            ? <PropertiesTable properties={myProperties} /> 
            : <Empty userId={userId}/>
      }
      
    </div>
  );
}

function Empty({userId}:{userId:string}) {
    const createHomeWithId = createNewHomeButton.bind(null, {
        userId: userId
    })
  return (
    <div className="pt-2">
      <p>Lista vacía. Por favor, agrega una propiedad.</p>
      <Button variant='secondary' onClick={() => createHomeWithId()}>
        Agregar propiedad
      </Button>
    </div>
  );
}
