import type { Meta, StoryObj } from '@storybook/react';
import { TransactionForm } from '@/components/transacoes/TransactionForm';

const meta = {
  title: 'transacoes/TransactionForm',
  component: TransactionForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockHandlers = {
  onAddTransaction: (transaction: any) => {
    console.log('Add transaction:', transaction);
  },
  getCurrentBalance: () => 5000,
};

export const Default: Story = {
  args: {
    ...mockHandlers,
  },
};

export const InModal: Story = {
  args: {
    isModal: true,
    onOpenChange: (open: boolean) => {
      console.log('Modal open:', open);
    },
    ...mockHandlers,
  },
};

export const WithLowBalance: Story = {
  args: {
    onAddTransaction: (transaction: any) => {
      console.log('Add transaction:', transaction);
    },
    getCurrentBalance: () => 100,
  },
};

export const WithHighBalance: Story = {
  args: {
    onAddTransaction: (transaction: any) => {
      console.log('Add transaction:', transaction);
    },
    getCurrentBalance: () => 50000,
  },
};
