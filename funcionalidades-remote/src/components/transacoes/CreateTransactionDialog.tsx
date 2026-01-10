'use client'

import type React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { TransactionForm } from './TransactionForm'
import type { Transaction } from '@/lib/types'

interface CreateTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void
  getCurrentBalance?: () => number
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onAddTransaction,
  getCurrentBalance,
}: CreateTransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>
            Adicione as informações da transação g
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          isModal
          onOpenChange={onOpenChange}
          onAddTransaction={onAddTransaction}
          getCurrentBalance={getCurrentBalance}
        />
      </DialogContent>
    </Dialog>
  )
}


