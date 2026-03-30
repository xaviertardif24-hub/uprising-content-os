import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-vh-80 text-center py-20">
      <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6">
        Générez et déployez des chatbots <span className="text-primary italic">gratuitement</span>.
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-10">
        La plateforme open source pour créer des assistants IA sophistiqués pour vos sites web, sans frais d'hébergement.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/dashboard" 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/25"
        >
          Accéder au Dashboard
        </Link>
        <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all">
          En savoir plus
        </button>
      </div>
    </div>
  );
}
