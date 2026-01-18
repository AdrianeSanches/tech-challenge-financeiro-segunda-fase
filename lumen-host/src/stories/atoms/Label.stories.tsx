import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Nome',
    },
    htmlFor: {
      control: { type: 'text' },
      defaultValue: 'input-id',
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Nome',
    htmlFor: 'input-id',
  },
}

export const CustomClass: Story = {
  args: {
    children: 'Com classe customizada',
    className: 'text-red-600',
  },
}