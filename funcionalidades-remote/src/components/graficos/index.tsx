import { Transaction } from "@/lib/types"
import { BarChartTransactions } from "./BarChartTransactions"
import { PieChartExpenses } from "./PieChartExpenses"


interface GraficosAppProps {
 transactions: Transaction[]
  typeGrafico: 'Bar' | 'Pie'
}

export default function GraficosApp({typeGrafico, transactions}: GraficosAppProps) {
    switch (typeGrafico) {
        case 'Bar':
            return(
                <BarChartTransactions transactions={transactions}/>
            )

        case 'Pie':
            return(
                <PieChartExpenses transactions={transactions}/>
            )
    
    
        default:
            return (
                <div className="p-4 text-center">
                    <p className="text-gray-600">Defina o tipo de gráfico</p>
                </div>
            )
            break;
    }
}