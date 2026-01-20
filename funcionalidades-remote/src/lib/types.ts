export type TransactionType =
  | 'deposito'
  | 'transferencia'
  | 'pagamento'
  | 'saque'

export interface TransactionAttachment {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: string
  description?: string
  category?: string
  attachments?: TransactionAttachment[]
}

export interface Account {
  balance: number
  accountNumber: string
  userName: string
  email: string
  password: string
  transactions: Transaction[]
}


