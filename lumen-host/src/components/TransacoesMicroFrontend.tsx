'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const TransacoesMicroFrontend = () => {
  // Criamos uma referência para a DIV onde o Angular vai desenhar
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Controle para evitar que o Angular tente iniciar duas vezes (comum no React Strict Mode)
  const isMounted = useRef(false);
  // Estados para controlar o carregamento
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar e montar o Angular
  const loadAndMount = useCallback(async () => {
    // Verifica se estamos no cliente (browser)
    if (typeof window === 'undefined') {
      return;
    }

    // Verifica se já foi montado
    if (isMounted.current) {
      return;
    }

    // Verifica se a DIV está disponível
    if (!wrapperRef.current) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Carrega o módulo remoto usando import dinâmico
      // Adiciona timeout para evitar travamento infinito
      const importPromise = import('transacoesMicro/TransacoesApp');
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Módulo remoto não carregou em 30 segundos')), 30000)
      );
      
      const remoteModuleRaw = await Promise.race([importPromise, timeoutPromise]);

      // O módulo pode vir com default export, então verificamos isso também
      let remoteModule = remoteModuleRaw as { mount?: (element: HTMLElement) => Promise<unknown>; default?: { mount?: (element: HTMLElement) => Promise<unknown> } };
      
      // Se não tiver mount direto, tenta pegar do default
      if (!remoteModule.mount && remoteModule.default) {
        remoteModule = remoteModule.default as { mount?: (element: HTMLElement) => Promise<unknown> };
      }

      // Verifica se o módulo foi carregado corretamente e se a função mount existe
      if (!remoteModule || typeof remoteModule.mount !== 'function') {
        // Verifica se é uma página Next.js (tem getServerSideProps) - indica que o remote não foi carregado
        const rawModule = remoteModuleRaw as Record<string, unknown>;
        if (rawModule?.getServerSideProps) {
          throw new Error(
            'Next.js intercepted the remote module import. This usually means the remoteEntry.js is not loading correctly. ' +
            'Please verify: 1) Angular remote is running, ' +
            '2) remoteEntry.js is accessible, ' +
            '3) No CORS errors in browser console.'
          );
        }
        
        throw new Error(
          'Remote module loaded but mount function is not available. ' +
          `Module contents: ${Object.keys(remoteModuleRaw || {}).join(', ')}. ` +
          'Please check if the Angular remote is correctly built.'
        );
      }

      // Marca como montado antes de chamar a função
      isMounted.current = true;
      
      // Chama a função mount do Angular passando o elemento
      await remoteModule.mount(wrapperRef.current);

      setIsLoading(false);
    } catch (err) {
      isMounted.current = false; // Permite tentar novamente em caso de erro
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao carregar o microfrontend';
      console.error('Erro ao inicializar o MFE Angular:', err);
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  // Callback ref para detectar quando o elemento é montado
  const setWrapperRef = useCallback((node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    // Quando o elemento for montado, tenta carregar o Angular
    if (node && !isMounted.current && typeof window !== 'undefined') {
      // Aguarda um tick para garantir que está totalmente no DOM
      setTimeout(() => {
        loadAndMount();
      }, 0);
    }
  }, [loadAndMount]);

  // useEffect de fallback caso o callback ref não funcione
  useEffect(() => {
    // Aguarda um pequeno delay para garantir que o DOM foi renderizado
    const timeoutId = setTimeout(() => {
      if (wrapperRef.current && !isMounted.current) {
        loadAndMount();
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadAndMount]);

  // Sempre renderiza o wrapper, mesmo durante loading, para que a ref possa ser atribuída
  return (
    <div>
      {isLoading && (
        <div className="p-4 text-center">
          <p className="text-gray-600">Carregando módulo Angular...</p>
        </div>
      )}
      {error && (
        <div className="p-4 text-center bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 font-semibold">Erro ao carregar microfrontend</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      )}
      {/* Sempre renderiza o wrapper para que a ref funcione */}
      <div 
        ref={setWrapperRef} 
        id="angular-container"
        style={{ display: error ? 'none' : 'block', minHeight: '50px' }}
      />
    </div>
  );
};

export default TransacoesMicroFrontend;
