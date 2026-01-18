import { RecentTransactions } from '@/components/recent-transactions'
import type { Meta, StoryObj } from '@storybook/nextjs'
import React from 'react'
import { TransactionsContext } from '@/contexts/transactions-context'
import { Transaction } from '@/lib/types'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Compra no mercado',
    amount: 120.5,
    type: 'pagamento',
    date: '2026-01-15',
  },
  {
    id: '2',
    description: 'Salário',
    amount: 3500,
    type: 'deposito',
    date: '2026-01-10',
  },
]

const meta = {
  title: 'transaction/RecentTransactions',
  component: RecentTransactions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TransactionsContext.Provider
        value={{
          transactions: mockTransactions,
          addTransaction: () => {},
          updateTransaction: () => {},
          deleteTransaction: () => {},
        }}
      >
        <Story />
      </TransactionsContext.Provider>
    ),
  ],
} satisfies Meta<typeof RecentTransactions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}