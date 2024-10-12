import { getMyProperties } from "@/actions/my-properties";
import { PropertiesTable } from "./PropertiesTable";
import { createNewHomeButton } from "@/actions";
import { Button } from "@/components/ui/button";

export default async function PropertiesContent({ userId }: { userId: string }) {
  const myProperties = await getMyProperties(userId);
  
  if (myProperties.length > 0) {
    return <PropertiesTable properties={myProperties} />;
  } else {
    return <Empty userId={userId} />;
  }
}

function Empty({userId}: {userId: string}) {
  const createHomeWithId = createNewHomeButton.bind(null, {
    userId: userId
  });

  return (
    <div className="pt-2">
      <p>Lista vacía. Por favor, agrega una propiedad.</p>
      <Button variant='secondary' onClick={() => createHomeWithId()}>
        Agregar propiedad
      </Button>
    </div>
  );
}