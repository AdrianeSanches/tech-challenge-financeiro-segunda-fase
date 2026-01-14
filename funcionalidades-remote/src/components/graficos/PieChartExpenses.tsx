"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Transaction } from "@/lib/types"

const chartConfig = {
  pagamento: { label: "Pagamento", color: "var(--transaction-payment)" },
  transferencia: { label: "Transferência", color: "var(--transaction-transfer-info)" },
  saque: { label: "Saque", color: "var(--transaction-withdraw)" },
} satisfies ChartConfig

interface PieChartExpensesProps {
  transactions: Transaction[]
}

export function PieChartExpenses({ transactions }: PieChartExpensesProps) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const chartData = (() => {
    const totals = transactions.reduce<Record<string, number>>((acc, t) => {
      // Ignore deposits and non-expenses
      if (t.type === "deposito") return acc
      if (t.amount >= 0) return acc

      const d = new Date(t.date)
      if (d.getMonth() !== currentMonth || d.getFullYear() !== currentYear) return acc

      acc[t.type] = (acc[t.type] ?? 0) + Math.abs(t.amount)
      return acc
    }, {})

    return Object.entries(totals).map(([type, value]) => ({
      name: type,
      value,
      fill: `var(--color-${type})`,
    }))
  })()

  const hasData = chartData.length > 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Despesas por categoria</CardTitle>
         <CardDescription>{now.toLocaleString('default', { month: 'long' })} - {currentYear}</CardDescription>
      </CardHeader>

      {!hasData ? (
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Nenhuma despesa registrada no mês atual
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Adicione despesas para visualizar o gráfico
            </p>
          </div>
        </CardContent>
      ) : (
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
              <Pie data={chartData} dataKey="value" nameKey="name">
                <LabelList
                  dataKey="name"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  )
}