'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

import { useTransactions } from '@/contexts/transactions-context';
import { useAccount } from '@/contexts/account-context';
import type { TransacoesProps } from 'funcionalidadesRemote/TransacoesApp';
import { toast } from 'sonner';

const TransacoesMicroFrontend = () => {
  console.log('🎯 TransacoesMicroFrontend: Componente inicializado');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [TransacoesComponent, setTransacoesComponent] = useState<React.ComponentType<TransacoesProps> | null>(null);
  
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { account } = useAccount();

  // Callback para exibir toast de erro de saldo a partir do remote
  const handleShowBalanceError = useCallback(() => {
    toast.error('Saldo insuficiente', {
      description: 'Você não possui saldo suficiente para realizar esta operação.',
    })
  }, [])

  const loadAndMount = useCallback(async () => {
    console.log('loadAndMount chamado - carregando componente via Module Federation');

    if (typeof window === 'undefined') {
      console.log('loadAndMount: saindo - server side');
      return;
    }

    if (isMounted.current) {
      console.log('loadAndMount: saindo - já montado');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('Fazendo import dinâmico do componente remoto...');

      // Usar import() dinâmico com Module Federation
      const remoteModule = await import('funcionalidadesRemote/TransacoesApp');
      console.log('Módulo remoto carregado via MF:', remoteModule);

      // O módulo pode vir com default export
      const Component = remoteModule.default || remoteModule;

      if (!Component || typeof Component !== 'function') {
        throw new Error(
          'Remote module loaded but component is not available. ' +
          `Module contents: ${Object.keys(remoteModule || {}).join(', ')}. ` +
          'Please check if the remote is correctly built.'
        );
      }

      console.log('Componente remoto carregado com sucesso:', Component.name || 'Component');
      isMounted.current = true;
      setTransacoesComponent(() => Component);
      setIsLoading(false);

    } catch (err) {
      isMounted.current = false;

      let errorMessage = 'Erro desconhecido ao carregar o microfrontend';
      let isConnectionError = false;

      if (err instanceof Error) {
        const errorStr = err.message.toLowerCase();

        if (errorStr.includes('connection refused') ||
            errorStr.includes('failed to fetch') ||
            errorStr.includes('networkerror') ||
            errorStr.includes('remoteentry.js') ||
            errorStr.includes('loading chunk') ||
            errorStr.includes('chunk load error')) {
          errorMessage = 'Servidor do remote não está rodando. Por favor, inicie o servidor do microfrontend na porta 4202.';
          isConnectionError = true;
        } else {
          errorMessage = err.message;
        }
      }

      if (!isConnectionError) {
        console.error('Erro ao inicializar o MFE:', err);
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  // Estratégia híbrida: useEffect como backup + setWrapperRef como principal
  useEffect(() => {
    console.log('useEffect backup - verificando se deve carregar...');

    // Só carrega se ainda não foi carregado e não há wrapper ainda
    if (!isMounted.current && !wrapperRef.current) {
      console.log('useEffect backup - carregando componente remoto...');
      loadAndMount();
    }

    return () => {
      isMounted.current = false;
    };
  }, [loadAndMount]); // Incluir loadAndMount como dependência

  const setWrapperRef = useCallback((node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    if (node && !isMounted.current && typeof window !== 'undefined') {
      // Timeout maior para garantir estabilidade e evitar looping
      setTimeout(() => {
        console.log('DOM pronto - carregando componente remoto...');
        loadAndMount();
      }, 500);
    }
  }, [loadAndMount]); // Incluir loadAndMount como dependência

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Carregando módulo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold text-lg mb-2">Erro ao carregar microfrontend</p>
        <p className="text-red-500 text-sm mb-4">{error}</p>
        {error.includes('Servidor do remote não está rodando') && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-sm font-medium mb-2">Como resolver:</p>
            <ol className="text-yellow-700 text-sm text-left list-decimal list-inside space-y-1">
              <li>Abra um novo terminal</li>
              <li>Navegue até a pasta: <code className="bg-yellow-100 px-2 py-1 rounded text-xs">funcionalidades-remote</code></li>
              <li>Execute: <code className="bg-yellow-100 px-2 py-1 rounded text-xs">npm run dev</code></li>
              <li>Aguarde o servidor iniciar na porta 4202</li>
              <li>Recarregue esta página</li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  if (!TransacoesComponent) {
    return null;
  }

  return (
    <div ref={setWrapperRef}>
      <TransacoesComponent
        transactions={transactions}
        onAddTransaction={addTransaction}
        onUpdateTransaction={updateTransaction}
        onDeleteTransaction={deleteTransaction}
        getCurrentBalance={() => account?.balance || 0}
        onShowBalanceError={handleShowBalanceError}
      />
    </div>
  );
};

export default TransacoesMicroFrontend;
