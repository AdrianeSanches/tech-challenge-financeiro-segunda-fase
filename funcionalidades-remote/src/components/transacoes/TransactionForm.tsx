'use client'

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
import { CategorySelect } from './CategorySelect'
import { FileUpload } from './FileUpload'
import type { Transaction, TransactionType, TransactionAttachment } from '@/lib/types'
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
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void
  getCurrentBalance?: () => number
  onShowBalanceError?: () => void
}

export function TransactionForm({
  isModal,
  onOpenChange,
  onAddTransaction,
  getCurrentBalance,
  onShowBalanceError,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('deposito')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [attachments, setAttachments] = useState<TransactionAttachment[]>([])


  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    if (!numbers) return ''
    const amount = Number.parseInt(numbers, 10) / 100
    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  const parseCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, '')
    return Number.parseInt(numbers, 10) / 100
  }
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setAmount(formatted)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const numAmount = parseCurrency(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Por favor, insira um valor válido')
      return
    }

    const finalAmount = type === 'deposito' ? numAmount : -Math.abs(numAmount)

    // Valida saldo antes de adicionar (igual à validação da home)
    if (getCurrentBalance) {
      const currentBalance = getCurrentBalance()
      if (finalAmount < 0 && currentBalance + finalAmount < 0) {
        // Usar callback do host para exibir toast (se disponível)
        // Caso contrário, usar toast local como fallback
        if (onShowBalanceError) {
          onShowBalanceError()
          // Fechar o modal após exibir o toast (igual à home)
          setTimeout(() => {
            onOpenChange?.(false)
          }, 300)
        } else {
          // Fallback: toast local se callback não estiver disponível
          toast.error('Saldo insuficiente', {
            description: 'Você não possui saldo suficiente para realizar esta operação.',
          })
        }
        return
      }
    }

    onAddTransaction({
      type,
      amount: finalAmount,
      date: new Date().toISOString().split('T')[0],
      description:
        description ||
        `${transactionTypes.find((t) => t.value === type)?.label}`,
      category: category && category !== 'none' ? category : undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    setAmount('')
    setDescription('')
    setCategory('')
    setAttachments([])

    onOpenChange?.(false)
    toast.success('Transação adicionada com sucesso')
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
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            R$
          </span>
          <Input
            id="amount"
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            value={amount}
            onChange={handleAmountChange}
            className="pl-10"
            required
          />
        </div>
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

      <CategorySelect
        type={type}
        value={category}
        onChange={setCategory}
      />

      <FileUpload
        attachments={attachments}
        onChange={setAttachments}
      />

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


