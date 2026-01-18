import { InfosCard } from '@/components/infos-card'

import type { Meta, StoryObj } from '@storybook/nextjs'
import { Gift } from 'lucide-react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'utils/InfosCard',
  component: InfosCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card usado para informações na landing page.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    Svg: {
      control: { disable: true },
      description: 'Aqui vai um SVG da biblioteca lucide-react',
    },
  },
} satisfies Meta<typeof InfosCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Conta e cartão gratuitos',
    Svg: Gift,
    description:
      'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.',
  },
}
