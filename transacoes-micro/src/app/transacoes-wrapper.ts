import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './app';
import { Transaction } from './types/transaction.interface';
import { TransactionService, TransactionCallbacks } from './services/transaction.service';
import 'zone.js';

// Interface para props recebidas do host
export interface TransacoesProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onUpdateTransaction: (id: string, data: Partial<Omit<Transaction, 'id'>>) => void;
  onDeleteTransaction: (id: string) => void;
  getCurrentBalance?: () => number;
}

// Armazena a referência da aplicação para possível cleanup
let appInstance: any = null;
let componentRef: any = null;
let transactionService: TransactionService | null = null;

// Recebemos o elemento HTML onde o Angular deve ser injetado
export async function mount(element: HTMLElement, props?: TransacoesProps) {
  if (!element) {
    throw new Error('Element is required to mount Angular application');
  }

  try {
    // Cria a aplicação Angular
    appInstance = await createApplication(appConfig);

    // Faz o bootstrap do componente App dentro do elemento fornecido
    componentRef = appInstance.bootstrap(App, element);

    // Se props foram fornecidas, inicializa o TransactionService
    if (props) {
      // Obtém o TransactionService da aplicação
      transactionService = appInstance.injector.get(TransactionService);

      // Inicializa o service com transações e callbacks
      const callbacks: TransactionCallbacks = {
        onAddTransaction: props.onAddTransaction,
        onUpdateTransaction: props.onUpdateTransaction,
        onDeleteTransaction: props.onDeleteTransaction,
        getCurrentBalance: props.getCurrentBalance,
      };

      transactionService.initialize(props.transactions, callbacks);
    }

    return componentRef;
  } catch (error) {
    console.error('Error mounting Angular application:', error);
    throw error;
  }
}

/**
 * Atualiza as transações no Angular quando há mudanças no host
 */
export async function updateTransactions(transactions: Transaction[]) {
  if (transactionService) {
    transactionService.updateTransactions(transactions);
  }
}

// Função opcional para desmontar a aplicação (útil para cleanup)
export async function unmount() {
  if (componentRef && componentRef.destroy) {
    componentRef.destroy();
    componentRef = null;
  }
  if (appInstance && appInstance.destroy) {
    appInstance.destroy();
    appInstance = null;
  }
}
