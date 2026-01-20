import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useTransactions } from '@/contexts/transactions-context'
import Link from 'next/link'
import { RecentTransactionRow } from '@/components/recent-transaction-row'

export function RecentTransactions() {
  const { transactions } = useTransactions()
  const recentTransactions = (transactions || []).slice(0, 5)

  let contentToRender

  if (recentTransactions.length > 0) {
    contentToRender = (
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <RecentTransactionRow
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    )
  } else {
    contentToRender = (
      <p className="text-muted-foreground pt-4 text-center">
        Nenhuma transação encontrada
      </p>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Extrato</CardTitle>
        <div className="flex gap-2">
          <Link href="/transacoes">
            <Button variant="ghost" size="icon" title="Editar transações">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {contentToRender}
        <Link href="/transacoes">
          <Button variant="link" className="w-full mt-4">
            Ver todas as transações
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

