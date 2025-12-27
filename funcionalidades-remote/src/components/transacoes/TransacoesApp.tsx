'use client'

import { useState } from 'react'
import { TransactionList } from './TransactionList'
import { TransactionDetailDialog } from './TransactionDetailDialog'
import { EditTransactionDialog } from './EditTransactionDialog'
import { CreateTransactionDialog } from './CreateTransactionDialog'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus } from 'lucide-react'
import type { Transaction } from '@/lib/types'

export interface TransacoesProps {
  transactions: Transaction[]
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void
  onUpdateTransaction: (id: string, data: Partial<Omit<Transaction, 'id'>>) => void
  onDeleteTransaction: (id: string) => void
  getCurrentBalance?: () => number
}

export default function TransacoesApp({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  getCurrentBalance,
}: TransacoesProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null,
  )

  const handleView = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setViewDialogOpen(true)
  }

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete)
      setTransactionToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-[10px] mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Transações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova transação
        </Button>
      </div>

      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onView={handleView}
      />

      <TransactionDetailDialog
        transaction={selectedTransaction}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <CreateTransactionDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onAddTransaction={onAddTransaction}
        getCurrentBalance={getCurrentBalance}
      />

      <EditTransactionDialog
        transaction={selectedTransaction}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateTransaction={onUpdateTransaction}
        getCurrentBalance={getCurrentBalance}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta transação? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDelete}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


