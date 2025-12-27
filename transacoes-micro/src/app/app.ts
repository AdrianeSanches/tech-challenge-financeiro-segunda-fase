import { Component, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from './types/transaction.interface';
import { TransactionService } from './services/transaction.service';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailDialogComponent } from './components/transaction-detail-dialog/transaction-detail-dialog.component';
import { CreateTransactionDialogComponent } from './components/create-transaction-dialog/create-transaction-dialog.component';
import { EditTransactionDialogComponent } from './components/edit-transaction-dialog/edit-transaction-dialog.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ButtonComponent } from './components/ui/button/button.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    TransactionListComponent,
    TransactionDetailDialogComponent,
    CreateTransactionDialogComponent,
    EditTransactionDialogComponent,
    DeleteConfirmationDialogComponent,
    ButtonComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  selectedTransaction = signal<Transaction | null>(null);
  viewDialogOpen = signal(false);
  createDialogOpen = signal(false);
  editDialogOpen = signal(false);
  deleteDialogOpen = signal(false);
  transactionToDelete = signal<string | null>(null);
  
  transactions = signal<Transaction[]>([]);

  constructor(private transactionService: TransactionService) {
    // Observa mudanças nas transações do service
    effect(() => {
      this.transactions.set(this.transactionService.getTransactions());
    });
  }

  ngOnInit(): void {
    // Inicializa com transações do service
    this.transactions.set(this.transactionService.getTransactions());
  }

  handleView(transaction: Transaction): void {
    this.selectedTransaction.set(transaction);
    this.viewDialogOpen.set(true);
  }

  handleEdit(transaction: Transaction): void {
    this.selectedTransaction.set(transaction);
    this.editDialogOpen.set(true);
  }

  handleDeleteClick(id: string): void {
    this.transactionToDelete.set(id);
    this.deleteDialogOpen.set(true);
  }

  confirmDelete(): void {
    const id = this.transactionToDelete();
    if (id) {
      this.transactionService.deleteTransaction(id);
      this.transactionToDelete.set(null);
      this.deleteDialogOpen.set(false);
    }
  }
}
