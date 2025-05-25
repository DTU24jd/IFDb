/*
  Stranica za pretragu serija.
  ZAŠTO: Omogućuje korisniku da pronađe serije po imenu koristeći TVmaze API search endpoint.
*/
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  let results: { show: { id: number; name: string; image?: { medium: string }; rating?: { average: number } } }[] = [];
  if (query) {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      results = await res.json();
    }
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rezultati pretrage za: <span className="text-blue-700">{query}</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.length === 0 && query && <div>Nema rezultata.</div>}
        {results.map((r) => (
          <Link key={r.show.id} href={`/shows/${r.show.id}`} className="rounded overflow-hidden shadow hover:shadow-lg transition bg-white">
            <img src={r.show.image?.medium || "/file.svg"} alt={r.show.name} className="w-full h-auto" />
            <div className="p-2">
              <h2 className="text-lg font-semibold">{r.show.name}</h2>
              <p className="text-sm">⭐ {r.show.rating?.average ?? "N/A"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
