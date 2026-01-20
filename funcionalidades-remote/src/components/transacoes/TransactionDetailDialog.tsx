'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Image as ImageIcon, File, Download } from 'lucide-react'
import type { Transaction } from '@/lib/types'

const transactionLabels: Record<string, string> = {
  deposito: 'Depósito',
  transferencia: 'Transferência',
  pagamento: 'Pagamento',
  saque: 'Saque',
}

// Cores de fundo para categoria baseadas no tipo da transação
const categoryBgColors: Record<string, string> = {
  deposito: 'bg-[var(--transaction-success)]',
  transferencia: 'bg-[var(--transaction-transfer-info)]',
  pagamento: 'bg-[var(--transaction-payment)]',
  saque: 'bg-[var(--transaction-withdraw)]',
}

interface TransactionDetailDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetailDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailDialogProps) {
  if (!transaction) return null

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
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
          <DialogDescription>
            Informações completas sobre esta transação
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tipo</p>
            <Badge variant={transaction.type}>
              {transactionLabels[transaction.type]}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Valor</p>
            <p
              className={`text-3xl font-bold ${transaction.amount >= 0 ? 'text-transaction-success' : 'text-foreground'}`}
            >
              {transaction.amount >= 0 ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Data</p>
            <p className="text-base font-medium">
              {formatDate(transaction.date)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Descrição</p>
            <p className="text-base">
              {transaction.description || 'Sem descrição'}
            </p>
          </div>
          {transaction.category && transaction.category !== 'none' && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Categoria</p>
              <Badge 
                className={`border-0 text-white ${categoryBgColors[transaction.type] || 'bg-[var(--transaction-success)]'}`}
              >
                {transaction.category}
              </Badge>
            </div>
          )}
          {transaction.attachments && transaction.attachments.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Anexos ({transaction.attachments.length})
              </p>
              <div className="space-y-2">
                {transaction.attachments.map((attachment) => (
                  <Card key={attachment.id}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 text-muted-foreground">
                          {attachment.type.startsWith('image/') ? (
                            <ImageIcon className="h-5 w-5" />
                          ) : attachment.type === 'application/pdf' ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <File className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(attachment.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          asChild
                        >
                          <a
                            href={attachment.url}
                            download={attachment.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              ID da Transação
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              {transaction.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


