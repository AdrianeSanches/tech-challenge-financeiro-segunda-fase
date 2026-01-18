import type React from 'react'
import { createContext, useContext } from 'react'
import type { Transaction } from '@/lib/types'
import { useAccount } from '@/contexts/account-context'

interface TransactionsContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (
    id: string,
    updatedData: Partial<Omit<Transaction, 'id'>>,
  ) => void
  deleteTransaction: (id: string) => void
}

export const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined,
)

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { account, addTransaction, updateTransaction, deleteTransaction } =
    useAccount()

  const transactions = account?.transactions || []

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactions must be used within TransactionsProvider')
  }
  return context
}

