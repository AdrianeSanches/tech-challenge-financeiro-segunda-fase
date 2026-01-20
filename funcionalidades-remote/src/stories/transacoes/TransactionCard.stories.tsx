import type { Meta, StoryObj } from '@storybook/react';
import { TransactionCard } from '@/components/transacoes/TransactionCard';
import { Transaction } from '@/lib/types';

const meta = {
  title: 'transacoes/TransactionCard',
  component: TransactionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockHandlers = {
  onEdit: (transaction: Transaction) => {
    console.log('Edit transaction:', transaction);
  },
  onDelete: (id: string) => {
    console.log('Delete transaction:', id);
  },
  onView: (transaction: Transaction) => {
    console.log('View transaction:', transaction);
  },
};

export const Deposito: Story = {
  args: {
    transaction: {
      id: '1',
      description: 'Salário mensal',
      amount: 5000,
      type: 'deposito',
      date: '2026-01-15',
    },
    ...mockHandlers,
  },
};

export const Pagamento: Story = {
  args: {
    transaction: {
      id: '2',
      description: 'Aluguel',
      amount: -1500,
      type: 'pagamento',
      date: '2026-01-05',
    },
    ...mockHandlers,
  },
};

export const Transferencia: Story = {
  args: {
    transaction: {
      id: '3',
      description: 'Transferência para poupança',
      amount: -1000,
      type: 'transferencia',
      date: '2026-01-10',
    },
    ...mockHandlers,
  },
};

export const Saque: Story = {
  args: {
    transaction: {
      id: '4',
      description: 'Saque no caixa eletrônico',
      amount: -500,
      type: 'saque',
      date: '2026-01-12',
    },
    ...mockHandlers,
  },
};

export const LargeAmount: Story = {
  args: {
    transaction: {
      id: '5',
      description: 'Bônus anual',
      amount: 15000,
      type: 'deposito',
      date: '2026-01-20',
    },
    ...mockHandlers,
  },
};

export const SmallAmount: Story = {
  args: {
    transaction: {
      id: '6',
      description: 'Café',
      amount: -12.5,
      type: 'pagamento',
      date: '2026-01-18',
    },
    ...mockHandlers,
  },
};

export const AllTypes: Story = {
  args: {
    transaction: {
      id: '1',
      description: 'Salário',
      amount: 5000,
      type: 'deposito',
      date: '2026-01-15',
    },
    ...mockHandlers,
  },
  render: (args) => (
    <div className="space-y-4 w-[600px]">
      <TransactionCard
        transaction={{
          id: '1',
          description: 'Salário',
          amount: 5000,
          type: 'deposito',
          date: '2026-01-15',
        }}
        {...mockHandlers}
      />
      <TransactionCard
        transaction={{
          id: '2',
          description: 'Conta de luz',
          amount: -250,
          type: 'pagamento',
          date: '2026-01-10',
        }}
        {...mockHandlers}
      />
      <TransactionCard
        transaction={{
          id: '3',
          description: 'Transferência investimento',
          amount: -1000,
          type: 'transferencia',
          date: '2026-01-08',
        }}
        {...mockHandlers}
      />
      <TransactionCard
        transaction={{
          id: '4',
          description: 'Saque emergência',
          amount: -300,
          type: 'saque',
          date: '2026-01-12',
        }}
        {...mockHandlers}
      />
    </div>
  ),
};
