import { BalanceCard } from '@/components/balance-card'
import { TransactionForm } from '@/components/transaction-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentTransactions } from '@/components/recent-transactions'
import { useAccount } from '@/contexts/account-context'
import { AppLayout } from '@/components/app-layout'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { account } = useAccount()
  const [isMounted, setIsMounted] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const currentBalance = account?.balance ? account.balance : 0

  useEffect(() => {
    // Agendar a atualização do estado de forma assíncrona para evitar renders em cascata
    let timer: NodeJS.Timeout
    
    const rafId: number = requestAnimationFrame(() => {
      setIsMounted(true)
      // Dar um pequeno delay para garantir que o contexto foi inicializado
      timer = setTimeout(() => {
        setHasChecked(true)
      }, 100)
    })
    
    return () => {
      cancelAnimationFrame(rafId)
      if (timer) clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Só redirecionar após verificação completa e se não houver conta
    if (isMounted && hasChecked && account === null) {
      // Usar window.location para evitar problemas com router durante hidratação
      window.location.href = '/'
    }
  }, [account, isMounted, hasChecked])

  const getGreeting = () => {
    const date = new Date()
    const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' })
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${formattedDate}`
  }

  // Aguardar montagem e verificação
  if (!isMounted || !hasChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (account === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Redirecionando...</p>
      </div>
    )
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="">
          <div className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                {account ? (
                  <h1 className="text-3xl font-bold mb-1">
                    {' '}
                    Olá, {account.userName.split(' ')[0]}!
                  </h1>
                ) : (
                  <h1>Carregando...</h1>
                )}
                <p className="text-sm text-muted-foreground">{getGreeting()}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <BalanceCard balance={currentBalance} />

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Nova transação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TransactionForm />
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <RecentTransactions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
