import { Sidebar } from '@/components/sidebar'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'molecules/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}