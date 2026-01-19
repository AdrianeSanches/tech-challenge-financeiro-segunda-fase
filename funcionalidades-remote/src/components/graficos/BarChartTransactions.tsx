"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Transaction } from "@/lib/types"
import { TrendingUp } from "lucide-react"

const chartConfig = {
  receitas: {
    label: "Receitas:",
    color: "#16a34a", // verde
  },
  despesas: {
    label: "Despesas:",
    color: "#ef4444", // vermelho
  },
} satisfies ChartConfig

interface BarChartTransactionsProps {
 transactions: Transaction[]
}

export function BarChartTransactions({ transactions }: BarChartTransactionsProps) {
  const chartData = (() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Build the last 6 months keys (oldest -> newest)
    const months: string[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1)
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const year = d.getFullYear()
      months.push(`${month}/${year}`)
    }

    // Initialize totals with all months (so months with no transactions show zeros)
    const totals = months.reduce<Record<string, { receitas: number; despesas: number }>>((acc, key) => {
      acc[key] = { receitas: 0, despesas: 0 }
      return acc
    }, {})

    // Aggregate only transactions that fall inside our months window
    transactions.forEach((t) => {
      const date = new Date(t.date)
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const key = `${month}/${year}`

      if (!Object.prototype.hasOwnProperty.call(totals, key)) return

      if (t.amount > 0) totals[key].receitas += t.amount
      else if (t.amount < 0) totals[key].despesas += -t.amount
    })

    return months.map((data) => ({
      data,
      receitas: totals[data].receitas,
      despesas: totals[data].despesas,
    }))
  })()

  // NEW: check if any month has data (receitas ou despesas)
  const hasData = chartData.some((d) => d.receitas > 0 || d.despesas > 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Balanço mensal</CardTitle>
        <CardDescription>Dos últimos 6 meses</CardDescription>
      </CardHeader>

      {!hasData ? (
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Nenhuma transação registrada nos últimos 6 meses
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Adicione transações para visualizar o gráfico
            </p>
          </div>
        </CardContent>
      ) : (
        <CardContent className="flex-1 pb-0" style={{ minHeight: '300px' }}>
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <ChartContainer 
              config={chartConfig} 
              className="[&_.recharts-text]:fill-foreground [&_.recharts-cartesian-axis-tick_text]:fill-foreground"
              style={{ 
                width: '100%', 
                height: '100%', 
                aspectRatio: 'unset',
                paddingBottom: 0
              }}
            >
            <BarChart 
              accessibilityLayer 
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <YAxis 
                tickFormatter={(v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v))}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <XAxis
                dataKey="data"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickFormatter={(value) => {
                  if (typeof value !== "string") return String(value)
                  const [mm, yyyy] = value.split("/")
                  return `${mm}/${yyyy.slice(-2)}`
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="receitas" fill={chartConfig.receitas.color} radius={4} />
              <Bar dataKey="despesas" fill={chartConfig.despesas.color} radius={4} />
            </BarChart>
          </ChartContainer>
          </div>
        </CardContent>
      )}
    </Card>
  )
}