import { Checkbox } from '@/components/ui/checkbox'
import type { Meta, StoryObj } from '@storybook/nextjs'
import React, { useState } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'

const meta = {
  title: 'atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveCheckbox(props: { disabled?: boolean; className?: string }) {
  const [checked, setChecked] = useState<CheckedState>(false)
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      disabled={props.disabled}
      className={props.className}
      aria-label='clique aqui'
    />
  )
}

export const Default: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
}

export const Disabled: Story = {
  render: (args) => <InteractiveCheckbox {...args} disabled />,
}