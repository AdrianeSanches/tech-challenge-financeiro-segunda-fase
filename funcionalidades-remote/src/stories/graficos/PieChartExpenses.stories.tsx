import type { Meta, StoryObj } from '@storybook/react';
import { PieChartExpenses } from '@/components/graficos/PieChartExpenses';
import { Transaction } from '@/lib/types';

const meta = {
  title: 'graficos/PieChartExpenses',
  component: PieChartExpenses,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PieChartExpenses>;

export default meta;
type Story = StoryObj<typeof meta>;

const currentDate = new Date().toISOString();

export const Default: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Conta de luz',
        amount: -250,
        type: 'pagamento',
        date: currentDate,
      },
      {
        id: '2',
        description: 'Transferência para poupança',
        amount: -1000,
        type: 'transferencia',
        date: currentDate,
      },
      {
        id: '3',
        description: 'Saque no caixa',
        amount: -500,
        type: 'saque',
        date: currentDate,
      },
    ],
  },
};

export const MostlyPayments: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Aluguel',
        amount: -2000,
        type: 'pagamento',
        date: currentDate,
      },
      {
        id: '2',
        description: 'Supermercado',
        amount: -800,
        type: 'pagamento',
        date: currentDate,
      },
      {
        id: '3',
        description: 'Conta de água',
        amount: -150,
        type: 'pagamento',
        date: currentDate,
      },
      {
        id: '4',
        description: 'Saque',
        amount: -200,
        type: 'saque',
        date: currentDate,
      },
    ],
  },
};

export const MostlyTransfers: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Transferência investimento',
        amount: -3000,
        type: 'transferencia',
        date: currentDate,
      },
      {
        id: '2',
        description: 'Transferência poupança',
        amount: -1500,
        type: 'transferencia',
        date: currentDate,
      },
      {
        id: '3',
        description: 'Pagamento cartão',
        amount: -500,
        type: 'pagamento',
        date: currentDate,
      },
    ],
  },
};

export const EmptyData: Story = {
  args: {
    transactions: [],
  },
};

export const OnlyDeposits: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Salário',
        amount: 5000,
        type: 'deposito',
        date: currentDate,
      },
      {
        id: '2',
        description: 'Freelance',
        amount: 1500,
        type: 'deposito',
        date: currentDate,
      },
    ],
  },
};

export const BalancedExpenses: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Pagamentos diversos',
        amount: -1000,
        type: 'pagamento',
        date: currentDate,
      },
      {
        id: '2',
        description: 'Transferências',
        amount: -1000,
        type: 'transferencia',
        date: currentDate,
      },
      {
        id: '3',
        description: 'Saques',
        amount: -1000,
        type: 'saque',
        date: currentDate,
      },
    ],
  },
};
