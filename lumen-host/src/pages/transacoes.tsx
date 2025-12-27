import { AppLayout } from '@/components/app-layout'
import TransacoesMicroFrontend from '@/components/TransacoesMicroFrontend'
import { useEffect, useState } from 'react'
import { useAccount } from '@/contexts/account-context'

export default function TransacoesPage() {
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

  // Para teste: sempre renderizar a página
  // Aguardar apenas montagem
  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Aguardando montagem...</p>
      </div>
    )
  }

  return (
    <AppLayout>
      <div className="w-full">
        <div className="flex-1 p-[15px] md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <TransacoesMicroFrontend />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

