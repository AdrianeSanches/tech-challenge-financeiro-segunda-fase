'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import type { Transaction, TransactionType } from '@/lib/types'
import { toast } from 'sonner'

const transactionTypes: { value: TransactionType; label: string }[] = [
  { value: 'deposito', label: 'Depósito' },
  { value: 'transferencia', label: 'Transferência' },
  { value: 'pagamento', label: 'Pagamento' },
  { value: 'saque', label: 'Saque' },
]

interface EditTransactionDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateTransaction: (id: string, data: Partial<Omit<Transaction, 'id'>>) => void
  getCurrentBalance?: () => number
}

export function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
  onUpdateTransaction,
  getCurrentBalance,
}: EditTransactionDialogProps) {
  const [type, setType] = useState<TransactionType>('deposito')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (transaction) {
      setType(transaction.type)
      setAmount(Math.abs(transaction.amount).toString())
      setDate(transaction.date)
      setDescription(transaction.description || '')
    }
  }, [transaction])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!transaction) return

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Por favor, insira um valor válido')
      return
    }

    const finalAmount = type === 'deposito' ? numAmount : -Math.abs(numAmount)

    // Valida saldo se o valor foi alterado
    if (getCurrentBalance && amount !== Math.abs(transaction.amount).toString()) {
      const currentBalance = getCurrentBalance()
      const oldAmount = transaction.amount
      const balanceDifference = finalAmount - oldAmount
      
      if (currentBalance + balanceDifference < 0) {
        toast.error('Saldo insuficiente')
        return
      }
    }

    onUpdateTransaction(transaction.id, {
      type,
      amount: finalAmount,
      date,
      description:
        description ||
        `${transactionTypes.find((t) => t.value === type)?.label}`,
    })

    onOpenChange(false)
    toast.success('Transação atualizada com sucesso')
  }

  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
          <DialogDescription>
            Atualize as informações da transação
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-type">Tipo de transação</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as TransactionType)}
            >
              <SelectTrigger id="edit-type">
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
            <Label htmlFor="edit-amount">Valor</Label>
            <Input
              id="edit-amount"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">Data</Label>
            <Input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição</Label>
            <Input
              id="edit-description"
              type="text"
              placeholder="Descrição da transação"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


