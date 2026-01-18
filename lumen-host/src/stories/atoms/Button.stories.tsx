import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Pencil } from 'lucide-react'

import { fn } from 'storybook/test'

const meta = {
  title: 'atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    title: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Concluir transação',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancelar',
    className: 'flex-1 bg-transparent',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Deletar',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Ver todas as transações',
  },
}

export const Icon: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    title: 'Editar',
    children: <Pencil className="h-4 w-4" />,
  },
}
