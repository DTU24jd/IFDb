'use client';
import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";

interface CastCredit {
  _embedded: {
    show: {
      id: number;
      name: string;
      image?: { medium: string };
    };
    character: {
      name: string;
      image?: { medium: string };
    };
  };
}

export default function ActorPage({ params }: { params: Promise<{ actorId: string }> }) {
  const { actorId } = use(params);
  const [actor, setActor] = useState<any>(null);
  const [credits, setCredits] = useState<CastCredit[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Dohvati podatke o glumcu
        const actorRes = await fetch(`https://api.tvmaze.com/people/${actorId}`);
        if (!actorRes.ok) throw new Error('Greška pri dohvaćanju podataka o glumcu.');
        const actorData = await actorRes.json();
        // Dohvati sve serije i uloge glumca
        const creditsRes = await fetch(`https://api.tvmaze.com/people/${actorId}/castcredits?embed[]=show&embed[]=character`);
        if (!creditsRes.ok) throw new Error('Greška pri dohvaćanju uloga.');
        const creditsData = await creditsRes.json();
        // Dohvati crew podatke
        const crewRes = await fetch(`https://api.tvmaze.com/people/${actorId}/crewcredits?embed[]=show`);
        let crewData = [];
        if (crewRes.ok) {
          crewData = await crewRes.json();
        }
        setActor(actorData);
        setCredits(creditsData);
        setCrew(crewData);
      } catch (err: any) {
        setError(err.message || 'Greška.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [actorId]);

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>{error}</div>;
  if (!actor) return null;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 bg-white rounded-lg shadow-md p-6 border">
        {actor.image?.medium ? (
          <Image
            src={actor.image.medium}
            alt={actor.name}
            width={120}
            height={160}
            className="rounded shadow border object-cover bg-gray-100"
          />
        ) : (
          <div className="w-[120px] h-[160px] rounded bg-gray-200 flex items-center justify-center text-gray-400 border">
            N/A
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
          {actor.country?.name && (
            <div className="text-gray-600 mb-1">Država: <span className="font-semibold">{actor.country.name}</span></div>
          )}
          {actor.birthday && (
            <div className="text-gray-600">Rođen: <span className="font-semibold">{actor.birthday}</span></div>
          )}
        </div>
      </div>
      <hr className="my-8" />
      {/* Prikaz serija i uloga samo ako ih ima */}
      {credits.length > 0 && (
        <>
          <hr className="my-8" />
          <h2 className="text-2xl font-semibold mb-4">Serije i uloge</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {credits.map((credit, idx) => (
              <div
                key={`${credit._embedded.show.id}-${encodeURIComponent(credit._embedded.character.name)}-${idx}`}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition border h-full"
              >
                <Link href={`/shows/${credit._embedded.show.id}`}>
                  <img
                    src={credit._embedded.show.image?.medium || "/file.svg"}
                    alt={credit._embedded.show.name}
                    width={210}
                    height={295}
                    className="rounded mb-3 w-full object-cover aspect-[2/3] bg-gray-100 show-img cursor-pointer hover:opacity-80 transition"
                  />
                </Link>
                <div className="font-semibold text-center text-lg mb-1">{credit._embedded.show.name}</div>
                <div className="text-sm text-gray-700 text-center">kao <span className="font-bold">{credit._embedded.character.name}</span></div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Prikaz crew kredita samo ako ih ima */}
      {crew.length > 0 && (
        <>
          <hr className="my-8" />
          <h2 className="text-2xl font-semibold mb-4">Sudjelovao kao član ekipe (crew)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {crew.map((credit, idx) => (
              <Link
                key={`${credit._embedded.show.id}-${credit.type}-${idx}`}
                href={`/shows/${credit._embedded.show.id}`}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition border h-full"
              >
                <img
                  src={credit._embedded.show.image?.medium || "/file.svg"}
                  alt={credit._embedded.show.name}
                  width={210}
                  height={295}
                  className="rounded mb-3 w-full object-cover aspect-[2/3] bg-gray-100 show-img"
                />
                <div className="font-semibold text-center text-lg mb-1">{credit._embedded.show.name}</div>
                <div className="text-sm text-gray-700 text-center">uloga: <span className="font-bold">{credit.type}</span></div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
