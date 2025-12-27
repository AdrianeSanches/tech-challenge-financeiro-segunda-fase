'use client'

import { Card, CardContent } from '@/components/ui/card'
import type { Transaction } from '@/lib/types'
import { TransactionCard } from './TransactionCard'

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
  onView: (transaction: Transaction) => void
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
  onView,
}: TransactionListProps) {
  if (!transactions || (transactions && transactions.length === 0)) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Nenhuma transação encontrada</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}


