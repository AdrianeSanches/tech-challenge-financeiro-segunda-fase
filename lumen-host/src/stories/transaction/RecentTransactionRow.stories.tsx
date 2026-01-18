import { RecentTransactionRow } from '@/components/recent-transaction-row'

import { Card, CardContent } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'transaction/RecentTransactionRow',
  component: RecentTransactionRow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecentTransactionRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    transaction: {
      id: '3',
      type: 'transferencia',
      amount: -500.0,
      date: '2022-11-21',
      description: 'Transferência enviada',
    },
  },
  render: (args) => (
    // wrapper ensures the Card can expand to the full canvas width
    <div className="w-full">
      <Card>
        <CardContent>
          <div className="space-y-4">
            <RecentTransactionRow {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}
