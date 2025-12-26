import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTransactions } from '@/contexts/transactions-context'
import type { TransactionType } from '@/lib/types'
import { toast } from 'sonner'

const transactionTypes: { value: TransactionType; label: string }[] = [
  { value: 'deposito', label: 'Depósito' },
  { value: 'transferencia', label: 'Transferência' },
  { value: 'pagamento', label: 'Pagamento' },
  { value: 'saque', label: 'Saque' },
]

interface TransactionFormProps {
  isModal?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TransactionForm({
  isModal,
  onOpenChange,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('deposito')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const { addTransaction } = useTransactions()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Por favor, insira um valor válido')
      return
    }

    const finalAmount = type === 'deposito' ? numAmount : -Math.abs(numAmount)

    addTransaction({
      type,
      amount: finalAmount,
      date: new Date().toISOString().split('T')[0],
      description:
        description ||
        `${transactionTypes.find((t) => t.value === type)?.label}`,
    })

    setAmount('')
    setDescription('')

    onOpenChange?.(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Tipo de transação</Label>
        <Select
          value={type}
          onValueChange={(value) => setType(value as TransactionType)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecione o tipo de transação" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypes.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input
          id="description"
          type="text"
          placeholder="Descrição da transação"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {isModal ? (
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => onOpenChange?.(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            Concluir transação
          </Button>
        </div>
      ) : (
        <Button type="submit" className="w-full" size="lg">
          Concluir transação
        </Button>
      )}
    </form>
  )
}

