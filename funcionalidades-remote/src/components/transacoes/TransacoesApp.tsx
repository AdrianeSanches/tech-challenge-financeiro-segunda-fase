'use client'

import { useState, useMemo } from 'react'
import { TransactionList } from './TransactionList'
import { TransactionDetailDialog } from './TransactionDetailDialog'
import { EditTransactionDialog } from './EditTransactionDialog'
import { CreateTransactionDialog } from './CreateTransactionDialog'
import { TransactionFilters, type FilterState } from './TransactionFilters'
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
  onShowBalanceError?: () => void
}

export default function TransacoesApp({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  getCurrentBalance,
  onShowBalanceError,
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
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    type: 'all',
    dateFrom: '',
    dateTo: '',
  })
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
  
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase()
        const descriptionMatch = transaction.description
          ?.toLowerCase()
          .includes(searchLower)
        if (!descriptionMatch) return false
      }

      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false
      }

     
      if (filters.dateFrom) {
        const transactionDate = new Date(transaction.date)
        const fromDate = new Date(filters.dateFrom)
        if (transactionDate < fromDate) return false
      }

      if (filters.dateTo) {
        const transactionDate = new Date(transaction.date)
        const toDate = new Date(filters.dateTo)
        toDate.setHours(23, 59, 59, 999)
        if (transactionDate > toDate) return false
      }

      return true
    })
  }, [transactions, filters])

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

      <TransactionFilters filters={filters} onFiltersChange={setFilters} />

      <TransactionList
        transactions={filteredTransactions}
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
        onShowBalanceError={onShowBalanceError}
      />

      <EditTransactionDialog
        transaction={selectedTransaction}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateTransaction={onUpdateTransaction}
        getCurrentBalance={getCurrentBalance}
        onShowBalanceError={onShowBalanceError}
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


