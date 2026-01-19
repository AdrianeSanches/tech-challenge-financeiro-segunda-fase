'use client'

import { useState, useMemo } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { TransactionType } from '@/lib/types'

// Categorias sugeridas baseadas no tipo de transação
const categoriesByType: Record<TransactionType, string[]> = {
  deposito: [
    'Salário',
    'Freelance',
    'Investimentos',
    'Reembolso',
    'Presente',
    'Venda',
    'Bônus',
    'Outros',
  ],
  saque: [
    'Compras',
    'Alimentação',
    'Transporte',
    'Lazer',
    'Emergência',
    'Investimento',
    'Outros',
  ],
  transferencia: [
    'Poupança',
    'Investimentos',
    'Empréstimo',
    'Conta Corrente',
    'Pagamento',
    'Outros',
  ],
  pagamento: [
    'Aluguel',
    'Contas',
    'Educação',
    'Saúde',
    'Cartão de Crédito',
    'Seguros',
    'Assinaturas',
    'Internet',
    'Telefone',
    'Luz',
    'Água',
    'Gás',
    'Outros',
  ],
}

interface CategorySelectProps {
  type: TransactionType
  value: string
  onChange: (value: string) => void
  showSuggestions?: boolean
}

export function CategorySelect({
  type,
  value,
  onChange,
  showSuggestions = true,
}: CategorySelectProps) {
  const [isCustom, setIsCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')

  const suggestedCategories = useMemo(() => {
    return categoriesByType[type] || []
  }, [type])

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === '__custom__') {
      setIsCustom(true)
      setCustomValue('')
      onChange('')
    } else {
      setIsCustom(false)
      onChange(selectedValue)
    }
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCustomValue(newValue)
    onChange(newValue)
  }

  const handleCustomBlur = () => {
    const matchedCategory = suggestedCategories.find(
      (cat) => cat.toLowerCase() === customValue.toLowerCase()
    )
    if (matchedCategory) {
      setIsCustom(false)
      onChange(matchedCategory)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria {!isCustom && '(opcional)'}</Label>
      
      {!isCustom ? (
        <>
          <Select value={value || 'none'} onValueChange={handleSelectChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sem categoria</SelectItem>
              {suggestedCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
              <SelectItem value="__custom__">
                <span className="font-medium">+ Criar categoria personalizada</span>
              </SelectItem>
            </SelectContent>
          </Select>

          {showSuggestions && suggestedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-muted-foreground self-center">
                Sugestões:
              </span>
              {suggestedCategories.slice(0, 5).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => onChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-2">
          <Input
            id="category-custom"
            type="text"
            placeholder="Digite o nome da categoria"
            value={customValue}
            onChange={handleCustomChange}
            onBlur={handleCustomBlur}
            autoFocus
          />
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => {
              setIsCustom(false)
              onChange('')
            }}
          >
            ← Voltar para categorias sugeridas
          </button>
        </div>
      )}
    </div>
  )
}
