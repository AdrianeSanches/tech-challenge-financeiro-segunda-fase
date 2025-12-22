import dynamic from 'next/dynamic';

// Importação dinâmica com SSR desligado (obrigatório para Microfrontends CSR)
const TransacoesMicroFrontend = dynamic(
  () => import('@/components/TransacoesMicroFrontend'),
  { ssr: false, loading: () => <p>Carregando Angular...</p> }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Host React (Next.js)</h1>
        <p className="text-gray-600">Esta barra e o fundo cinza são React.</p>
      </header>
      
      <main className="border-4 border-dashed border-blue-500 p-6 bg-white rounded-lg shadow-xl">
        <p className="mb-4 text-blue-600 font-semibold uppercase text-sm tracking-wider">
          Area do Microfrontend Angular (Abaixo) ▼
        </p>
        
        {/* Aqui o Angular vai aparecer */}
        <TransacoesMicroFrontend />
        
      </main>
    </div>
  );
}