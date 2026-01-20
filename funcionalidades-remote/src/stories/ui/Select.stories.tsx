import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'ui/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="category">Categoria</Label>
      <Select>
        <SelectTrigger id="category" className="w-[200px]">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alimentacao">Alimentação</SelectItem>
          <SelectItem value="transporte">Transporte</SelectItem>
          <SelectItem value="moradia">Moradia</SelectItem>
          <SelectItem value="saude">Saúde</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Selecione um tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Receitas</SelectLabel>
          <SelectItem value="salario">Salário</SelectItem>
          <SelectItem value="freelance">Freelance</SelectItem>
          <SelectItem value="investimento">Investimento</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Despesas</SelectLabel>
          <SelectItem value="alimentacao">Alimentação</SelectItem>
          <SelectItem value="transporte">Transporte</SelectItem>
          <SelectItem value="moradia">Moradia</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const TransactionType: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="type">Tipo de Transação</Label>
      <Select>
        <SelectTrigger id="type" className="w-[200px]">
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deposito">Depósito</SelectItem>
          <SelectItem value="saque">Saque</SelectItem>
          <SelectItem value="transferencia">Transferência</SelectItem>
          <SelectItem value="pagamento">Pagamento</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]" size="sm">
        <SelectValue placeholder="Small select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};
