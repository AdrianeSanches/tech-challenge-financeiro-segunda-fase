import React, { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { TransactionsProvider } from '@/contexts/transactions-context'
import { useAccount } from '@/contexts/account-context'
import { Loader2 } from 'lucide-react'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { account } = useAccount()
  const [isMounted, setIsMounted] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

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

  // Aguardar montagem e verificação
  if (!isMounted || !hasChecked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-[16px]">
        <span className="text-[25px] font-bold">Aguarde...</span>
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (account === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-[16px]">
        <span className="text-[25px] font-bold">Redirecionando...</span>
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <TransactionsProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          {children}
        </div>
      </div>
    </TransactionsProvider>
  )
}

