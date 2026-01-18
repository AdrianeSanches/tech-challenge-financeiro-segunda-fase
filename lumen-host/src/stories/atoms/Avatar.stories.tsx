import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/100" alt="Avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="Avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}