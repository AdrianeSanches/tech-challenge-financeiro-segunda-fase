import { Transaction } from '@/lib/types'
import {
  useClientFormattedDate,
  useClientFormattedMonth,
} from '@/hooks/client-hooks'

const transactionLabels: Record<string, string> = {}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(value))
}

interface RecentTransactionRowProps {
  transaction: Transaction
}

export function RecentTransactionRow({
  transaction,
}: RecentTransactionRowProps) {
  const displayDate = useClientFormattedDate(transaction.date)
  const displayMonth = useClientFormattedMonth(transaction.date)

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex-1">
        <p className="text-xs text-transaction-success font-medium uppercase mb-1">
          {displayMonth}
        </p>
        <p className="font-medium text-sm">
          {transactionLabels[transaction.type]}
        </p>
        <p
          className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-transaction-success' : 'text-foreground'}`}
        >
          {transaction.amount >= 0 ? '' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
      </div>
      <div className="text-right text-sm text-muted-foreground">
        {displayDate}
      </div>
    </div>
  )
}

