"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Transaction } from "@/lib/types"

/* chartData will be computed from the `transactions` prop inside the component. */

const chartConfig = {
  saldo: {
    label: "Saldo mensal",
    color: "#2563eb",
  },
} satisfies ChartConfig

interface GraficosProps {
 transactions: Transaction[]
}

export default function GraficosApp({transactions}: GraficosProps) {
  const chartData = (() => {
    const totals = transactions.reduce<Record<string, number>>((acc, t) => {
      const date = new Date(t.date)
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const key = `${month}/${year}`
      acc[key] = (acc[key] ?? 0) + t.amount
      return acc
    }, {})

    return Object.entries(totals)
      .sort(([a], [b]) => {
        const [am, ay] = a.split('/')
        const [bm, by] = b.split('/')
        return new Date(Number(ay), Number(am) - 1).getTime() - new Date(Number(by), Number(bm) - 1).getTime()
      })
      .map(([data, value]) => ({
        data,
        saldo: Math.round(value * 100) / 100,
      }))
  })()

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="data"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            if (typeof value !== 'string') return String(value)
            const [mm, yyyy] = value.split('/')
            return `${mm}/${yyyy.slice(-2)}`
          }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="saldo" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
