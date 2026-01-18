import { Header } from '@/components/header'
import { AccountProvider } from '@/contexts/account-context'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'molecules/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AccountProvider>
        <Story />
      </AccountProvider>
    ),
  ],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}