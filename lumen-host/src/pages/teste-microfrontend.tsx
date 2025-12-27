'use client';

import { useEffect, useState } from 'react';

export default function TesteMicrofrontend() {
  const [status, setStatus] = useState('Inicializando...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🎯 Página de teste: useEffect executado');

    const loadRemote = async () => {
      try {
        setStatus('Tentando carregar remote...');
        console.log('Tentando importar funcionalidadesRemote/TransacoesApp...');

        const remoteModule = await import('funcionalidadesRemote/TransacoesApp');
        console.log('Módulo remoto carregado com sucesso:', remoteModule);

        setStatus('Remote carregado com sucesso!');

        if (remoteModule.default) {
          setStatus('Componente encontrado no módulo');
        } else {
          setStatus('Componente não encontrado no módulo');
        }
      } catch (err) {
        console.error('Erro ao carregar remote:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setStatus('Erro ao carregar remote');
      }
    };

    // Pequeno delay para garantir que tudo está inicializado
    setTimeout(loadRemote, 1000);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Teste Microfrontend</h1>
      <p className="mb-4">Status: <strong>{status}</strong></p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erro:</strong> {error}
        </div>
      )}
      <div className="border border-gray-300 rounded p-4">
        <p>Verifique o console do navegador (F12) para mais detalhes.</p>
      </div>
    </div>
  );
}
