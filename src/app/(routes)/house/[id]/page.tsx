interface HousePageProps {
    params: {
        id: string
    }
}
export default function HousePage({params}: HousePageProps) {
  return (
    <div>
      <h1>Hello Page {params.id}</h1>
    </div>
  );
}