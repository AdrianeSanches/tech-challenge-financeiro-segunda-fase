declare module 'funcionalidadesRemote/TransacoesApp' {
  import type { ComponentType } from 'react';
  import type { Transaction } from '@/lib/types';

  export interface TransacoesProps {
    transactions: Transaction[];
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    onUpdateTransaction: (id: string, data: Partial<Omit<Transaction, 'id'>>) => void;
    onDeleteTransaction: (id: string) => void;
    getCurrentBalance?: () => number;
  }

  const TransacoesApp: ComponentType<TransacoesProps>;
  export default TransacoesApp;
}

