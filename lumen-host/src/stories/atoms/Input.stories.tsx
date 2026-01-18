import { Input } from '@/components/ui/input'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'text' },
      defaultValue: 'text',
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Digite algo...',
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Senha',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Desabilitado',
    disabled: true,
  },
}