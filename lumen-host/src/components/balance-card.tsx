import { Card, CardContent } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
      <CardContent className="px-4 md:px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">Saldo</span>
          <Button
            variant="ghost"
            size="icon"
            title="Visualizar saldo"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="space-y-1">
          <p className="text-xs opacity-75">Conta Corrente</p>
          <p className="text-4xl font-bold tracking-tight">
            {showBalance ? formatCurrency(balance) : '••••••'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

