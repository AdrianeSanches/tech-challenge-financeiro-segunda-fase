import React, { createContext, useContext, useState, useEffect } from 'react'
import { Account, Transaction } from '@/lib/types'
import { mockAccounts } from '@/lib/mock-data'
import { toast } from 'sonner'

interface AccountContextType {
  account: Account | null
  login: (accountData: Account) => void
  logout: () => void
  addTransaction: (transactionData: Omit<Transaction, 'id'>) => void
  updateTransaction: (
    id: string,
    updatedData: Partial<Omit<Transaction, 'id'>>,
  ) => void
  deleteTransaction: (id: string) => void
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export function AccountProvider({ children }: { children: React.ReactNode }) {
  // Inicializar account do localStorage se existir
  const [account, setAccount] = useState<Account | null>(() => {
    if (typeof window === 'undefined') return null
    
    try {
      const currentAccount = localStorage.getItem('currentAccount')
      if (currentAccount) {
        return JSON.parse(currentAccount)
      }
    } catch {
      // Ignorar erros de parsing
    }
    return null
  })

  // Salvar account atual no localStorage quando mudar
  useEffect(() => {
    if (account === null) {
      localStorage.removeItem('currentAccount')
      return
    }

    // Salvar account atual
    localStorage.setItem('currentAccount', JSON.stringify(account))

    // Atualizar na lista de contas
    let list: Account[] = []
    try {
      const storedList = localStorage.getItem('accountsList')
      list = JSON.parse(storedList || '[]')
      if (!Array.isArray(list) || list.length === 0) {
        list = mockAccounts
      }
    } catch {
      list = mockAccounts
    }

    const updatedList = list.map((acc) => {
      if (acc.accountNumber === account.accountNumber) {
        return account
      }
      return acc
    })

    localStorage.setItem('accountsList', JSON.stringify(updatedList))
  }, [account])

  const login = (accountData: Account) => {
    setAccount(accountData)
  }

  const logout = () => {
    setAccount(null)
    localStorage.removeItem('currentAccount')
  }

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    }

    // adicionando verificação para saldo inferior ao valor das transações de saída
    const currentAccount = account
    if (!currentAccount) {
      return
    }
    if (
      newTransaction.amount < 0 &&
      currentAccount.balance + newTransaction.amount < 0
    ) {
      toast.error('Saldo insuficiente', {
        description:
          'Você não possui saldo suficiente para realizar esta operação.',
      })
      return
    }

    setAccount((prevAccount) => {
      if (!prevAccount) return null
      return {
        ...prevAccount,
        balance: prevAccount.balance + newTransaction.amount,
        transactions: [newTransaction, ...prevAccount.transactions],
      }
    })

    toast.success('Transação adicionada com sucesso')
  }

  const updateTransaction = (
    id: string,
    updatedData: Partial<Omit<Transaction, 'id'>>,
  ) => {
    // adicionando verificação para saldo inferior ao valor das transações de saída
    const currentAccount = account
    if (!currentAccount) return

    const transactionToUpdate = currentAccount.transactions.find(
      (t) => t.id === id,
    )
    if (!transactionToUpdate) return

    const oldAmount = transactionToUpdate.amount
    const newAmount = updatedData.amount ?? oldAmount
    const balanceDifference = newAmount - oldAmount
    const potentialNewBalance = currentAccount.balance + balanceDifference
    if (potentialNewBalance < 0) {
      toast.error('Saldo insuficiente', {
        description:
          'Você não possui saldo suficiente para realizar esta operação.',
      })
      return
    }

    setAccount((prevAccount) => {
      if (!prevAccount) return null
      let balanceDifference = 0

      const newTransactions = prevAccount.transactions.map((t) => {
        if (t.id === id) {
          const oldAmount = t.amount
          const newAmount = updatedData.amount ?? oldAmount
          balanceDifference = newAmount - oldAmount
          return { ...t, ...updatedData, id }
        }
        return t
      })

      return {
        ...prevAccount,
        balance: prevAccount.balance + balanceDifference,
        transactions: newTransactions,
      }
    })

    toast.success('Transação atualizada com sucesso')
  }

  const deleteTransaction = (id: string) => {
    setAccount((prevAccount) => {
      if (!prevAccount) return null

      const transactionToDelete = prevAccount.transactions.find(
        (t) => t.id === id,
      )

      if (!transactionToDelete) return prevAccount
      const newTransactions = prevAccount.transactions.filter(
        (t) => t.id !== id,
      )

      const newBalance = prevAccount.balance - transactionToDelete.amount
      return {
        ...prevAccount,
        balance: newBalance,
        transactions: newTransactions,
      }
    })
  }

  const value = {
    account,
    login,
    logout,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount deve ser usado dentro de um AccountProvider')
  }
  return context
}

