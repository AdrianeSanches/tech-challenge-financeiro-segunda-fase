'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, X } from 'lucide-react'
import type { TransactionType } from '@/lib/types'

export interface FilterState {
  searchQuery: string
  type: TransactionType | 'all'
  dateFrom: string
  dateTo: string
}

interface TransactionFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function TransactionFilters({
  filters,
  onFiltersChange,
}: TransactionFiltersProps) {
  const handleClearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      type: 'all',
      dateFrom: '',
      dateTo: '',
    })
  }

  const hasActiveFilters =
    filters.searchQuery ||
    filters.type !== 'all' ||
    filters.dateFrom ||
    filters.dateTo

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Buscar por descrição..."
                value={filters.searchQuery}
                onChange={(e) =>
                  onFiltersChange({ ...filters, searchQuery: e.target.value })
                }
                className="pl-9"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={filters.type}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  type: value as TransactionType | 'all',
                })
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="deposito">Depósito</SelectItem>
                <SelectItem value="saque">Saque</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
                <SelectItem value="pagamento">Pagamento</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <Label htmlFor="dateFrom">Data inicial</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                onFiltersChange({ ...filters, dateFrom: e.target.value })
              }
            />
          </div>

      
          <div className="space-y-2">
            <Label htmlFor="dateTo">Data final</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                onFiltersChange({ ...filters, dateTo: e.target.value })
              }
            />
          </div>
        </div>

     
        {hasActiveFilters && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Limpar filtros
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
