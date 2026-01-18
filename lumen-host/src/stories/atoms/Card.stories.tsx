import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Descrição breve do card.</CardDescription>
        <CardAction>
          <Button size="sm">Ação</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Conteúdo principal do card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Cancelar</Button>
        <Button size="sm">Confirmar</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>Card simples sem header ou footer.</p>
      </CardContent>
    </Card>
  ),
}