'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Eye } from 'lucide-react'

import type { Transaction } from '@/lib/types'

const transactionLabels: Record<string, string> = {
  deposito: 'Depósito',
  transferencia: 'Transferência',
  pagamento: 'Pagamento',
  saque: 'Saque',
}

interface TransactionCardProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
  onView: (transaction: Transaction) => void
}

export function TransactionCard({
  transaction,
  onEdit,
  onDelete,
  onView,
}: TransactionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={transaction.type}>
                {transactionLabels[transaction.type]}
              </Badge>
              {transaction.category && (
                <Badge variant="outline" className="text-xs">
                  {transaction.category}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {formatDate(transaction.date)}
              </span>
            </div>
            <p
              className={`text-2xl font-bold ${
                transaction.amount >= 0
                  ? 'text-transaction-success'
                  : 'text-foreground'
              }`}
            >
              {transaction.amount >= 0 ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
            {transaction.description && (
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {transaction.description}
              </p>
            )}
            {transaction.attachments && transaction.attachments.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                📎 {transaction.attachments.length} anexo(s)
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onView(transaction)}
              title="Ver detalhes"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(transaction)}
              title="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(transaction.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Deletar"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(value))
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}


