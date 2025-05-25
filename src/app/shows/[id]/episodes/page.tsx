import Link from 'next/link';

type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  image?: {
    medium: string;
  };
};

export default async function EpisodesListPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  if (!res.ok) return <div>Greška pri dohvaćanju epizoda.</div>;
  const episodes: Episode[] = await res.json();

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Sve epizode</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="border p-4 rounded bg-white shadow hover:shadow-lg transition">
            <Link href={`/shows/${id}/episodes/${episode.id}`} className="text-blue-700 hover:text-green-700 font-semibold text-lg underline">
              Sezona {episode.season}, Epizoda {episode.number}: {episode.name}
            </Link>
            <p className="text-sm text-gray-600">Datum emitiranja: {episode.airdate}</p>
            {episode.image && (
              <img src={episode.image.medium} alt={episode.name} className="mt-2 rounded border border-blue-100" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href={`/shows/${id}`} className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded transition">
          ← Nazad na detalje serije
        </Link>
      </div>
    </div>
  );
}
