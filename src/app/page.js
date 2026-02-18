import Skeleton from './components/Skeleton';

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      
      {/* Bilgilendirme */}
      <div className="mb-12 border-b border-gray-600 pb-6">
        <h1 className="text-4xl font-bold mb-2">Next.js UI Modülleri 🚀</h1>
        <p className="text-zinc-500">Komut paletini açmak için <kbd className="border px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800">Ctrl + K</kbd> tuşlarına basın.</p>
      </div>

      {/* Skeleton Showcase */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Skeleton Loader Örnekleri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Örnek 1: Profil Kartı İskeleti */}
          <div className="p-4 rounded-xl space-y-4">
            <h3 className="text-sm text-zinc-400 mb-4 font-mono">Profil Kartı</h3>
            <div className="flex items-center gap-4">
              <Skeleton.Circle size="w-16 h-16" />
              <div className="space-y-2 flex-1">
                <Skeleton.Rectangle width="w-3/4" height="h-5" />
                <Skeleton.Rectangle width="w-1/2" height="h-4" />
              </div>
            </div>
          </div>

          {/* Örnek 2: Blog Yazısı İskeleti */}
          <div className="p-4 rounded-xl space-y-4">
            <h3 className="text-sm text-zinc-400 mb-4 font-mono"># Post İçeriği</h3>
            <Skeleton.Rectangle height="h-40" className="rounded-lg" />
            <Skeleton.Rectangle width="w-full" />
            <Skeleton.Rectangle width="w-full" />
            <Skeleton.Rectangle width="w-2/3" />
          </div>

        </div>
      </section>
    </main>
  );
}