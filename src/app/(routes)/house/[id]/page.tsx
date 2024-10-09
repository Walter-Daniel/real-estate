import { getHouse } from "@/actions/property/get-house";

interface HousePageProps {
    params: {
        id: string
    }
}
export default async function HousePage({params}: HousePageProps) {
  const house = await getHouse(params.id);
  return (
    <div>
      <h1>Hello Page {params.id}</h1>
    </div>
  );
}