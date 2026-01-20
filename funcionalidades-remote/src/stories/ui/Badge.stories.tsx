import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { Check, X, AlertCircle } from 'lucide-react';

const meta = {
  title: 'ui/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'deposito', 'transferencia', 'pagamento', 'saque'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Deposito: Story = {
  args: {
    variant: 'deposito',
    children: 'Depósito',
  },
};

export const Transferencia: Story = {
  args: {
    variant: 'transferencia',
    children: 'Transferência',
  },
};

export const Pagamento: Story = {
  args: {
    variant: 'pagamento',
    children: 'Pagamento',
  },
};

export const Saque: Story = {
  args: {
    variant: 'saque',
    children: 'Saque',
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge>
        <Check className="h-3 w-3" />
        Success
      </Badge>
      <Badge variant="destructive">
        <X className="h-3 w-3" />
        Error
      </Badge>
      <Badge variant="secondary">
        <AlertCircle className="h-3 w-3" />
        Warning
      </Badge>
    </div>
  ),
};
