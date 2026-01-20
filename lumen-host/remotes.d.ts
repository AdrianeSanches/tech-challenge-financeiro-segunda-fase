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

declare module 'funcionalidadesRemote/GraficosApp' {
  import type { ComponentType } from 'react';

  export interface GraficosProps {
    transactions: Transaction[];
     typeGrafico: 'Bar' | 'Pie'
  }

  const GraficosApp: ComponentType<GraficosProps>;
  export default GraficosApp;
}
