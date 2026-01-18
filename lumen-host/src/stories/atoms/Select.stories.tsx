import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from '@/components/ui/select'
import type { Meta, StoryObj } from '@storybook/nextjs'
import React, { useState } from 'react'

const meta = {
  title: 'atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'opcao1', label: 'Opção 1' },
  { value: 'opcao2', label: 'Opção 2' },
  { value: 'opcao3', label: 'Opção 3' },
]

// Componente para o story Default
function SelectDefaultStory() {
  const [value, setValue] = useState('')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Componente para o story WithGroupAndSeparator
function SelectWithGroupAndSeparatorStory() {
  const [value, setValue] = useState('')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Escolha" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Grupo 1</SelectLabel>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Grupo 2</SelectLabel>
          <SelectItem value="c">C</SelectItem>
          <SelectItem value="d">D</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

// Componente para o story SmallSize
function SelectSmallSizeStory() {
  const [value, setValue] = useState('')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger size="sm">
        <SelectValue placeholder="Pequeno" />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const Default: Story = {
  render: () => <SelectDefaultStory />,
}

export const WithGroupAndSeparator: Story = {
  render: () => <SelectWithGroupAndSeparatorStory />,
}

export const SmallSize: Story = {
  render: () => <SelectSmallSizeStory />,
}