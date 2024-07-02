export default function Repositorio({ params }: { params: { name: string } }) {
  return (
    <h1>Repositorio: {params.name}</h1>
  );
}
