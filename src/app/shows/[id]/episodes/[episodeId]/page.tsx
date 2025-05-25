// src/app/shows/[id]/episodes/[episodeId]/page.tsx
import Link from "next/link";

interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  summary: string;
  image?: { medium: string };
}

export default async function EpisodeDetail({ params }: { params: { id: string; episodeId: string } }) {
  const { episodeId, id } = params;
  const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
  if (!res.ok) return <div>Greška pri dohvaćanju epizode.</div>;
  const episode: Episode = await res.json();

  return (
    <div className="p-4">
      <Link href={`/shows/${id}/episodes`} className="text-blue-500 underline mb-4 inline-block">← Natrag na epizode</Link>
      <h1 className="text-2xl font-bold mb-2">{episode.name}</h1>
      <img src={episode.image?.medium || "/file.svg"} alt={episode.name} className="w-48 mb-4" />
      <div className="mb-2">Sezona: {episode.season}, Epizoda: {episode.number}</div>
      <div className="mb-2">Datum prikazivanja: {episode.airdate}</div>
      <div dangerouslySetInnerHTML={{ __html: episode.summary }} className="mb-4" />
    </div>
  );
}
