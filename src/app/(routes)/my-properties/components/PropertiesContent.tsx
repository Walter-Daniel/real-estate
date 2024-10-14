import { getHouses } from "@/actions/my-houses";
import { PropertiesTable } from "./PropertiesTable";
import { Empty } from "./empty";

export default async function PropertiesContent({ userId }: { userId: string }) {
  const myProperties = await getHouses(userId);
  
  if (myProperties.length > 0) {
    return <PropertiesTable properties={myProperties} />;
  } else {
    return <Empty userId={userId} />;
  }
}
