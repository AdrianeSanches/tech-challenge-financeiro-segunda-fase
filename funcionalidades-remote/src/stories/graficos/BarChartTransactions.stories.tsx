import type { Meta, StoryObj } from '@storybook/react';
import { BarChartTransactions } from '@/components/graficos/BarChartTransactions';
import { Transaction } from '@/lib/types';

const meta = {
  title: 'graficos/BarChartTransactions',
  component: BarChartTransactions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BarChartTransactions>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data helper
const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  // Generate transactions for the last 6 months
  for (let i = 0; i < 6; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    
    // Add some receitas (positive amounts)
    transactions.push({
      id: `rec-${i}-1`,
      description: `Salário ${i + 1}`,
      amount: 5000 + Math.random() * 2000,
      type: 'deposito',
      date: month.toISOString(),
    });
    
    // Add some despesas (negative amounts)
    transactions.push({
      id: `desp-${i}-1`,
      description: `Aluguel ${i + 1}`,
      amount: -(1500 + Math.random() * 500),
      type: 'pagamento',
      date: month.toISOString(),
    });
    
    transactions.push({
      id: `desp-${i}-2`,
      description: `Alimentação ${i + 1}`,
      amount: -(800 + Math.random() * 400),
      type: 'pagamento',
      date: month.toISOString(),
    });
  }
  
  return transactions;
};

export const Default: Story = {
  args: {
    transactions: generateMockTransactions(),
  },
};

export const WithHighIncome: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Salário',
        amount: 15000,
        type: 'deposito',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        description: 'Aluguel',
        amount: -2000,
        type: 'pagamento',
        date: new Date().toISOString(),
      },
    ],
  },
};

export const WithHighExpenses: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Salário',
        amount: 5000,
        type: 'deposito',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        description: 'Compras',
        amount: -4500,
        type: 'pagamento',
        date: new Date().toISOString(),
      },
    ],
  },
};

export const EmptyData: Story = {
  args: {
    transactions: [],
  },
};

export const BalancedBudget: Story = {
  args: {
    transactions: [
      {
        id: '1',
        description: 'Receita Mensal',
        amount: 6000,
        type: 'deposito',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        description: 'Despesas Totais',
        amount: -6000,
        type: 'pagamento',
        date: new Date().toISOString(),
      },
    ],
  },
};
