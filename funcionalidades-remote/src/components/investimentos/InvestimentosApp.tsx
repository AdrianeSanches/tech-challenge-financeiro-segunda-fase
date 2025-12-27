'use client'

import { Card, CardContent } from '@/components/ui/card'

export interface InvestimentosProps {
  // Props podem ser adicionadas no futuro
}

export default function InvestimentosApp({}: InvestimentosProps) {
  return (
    <div className="w-full">
      <div className="flex-1 p-[15px] md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Investimentos</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seus investimentos financeiros
            </p>
          </div>

          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg font-semibold mb-2">
                Página de Investimentos acessada com sucesso!
              </p>
              <p className="text-muted-foreground">
                Esta funcionalidade será implementada em breve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


