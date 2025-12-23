import { useEffect, useState } from 'react'
import { useAccount } from '@/contexts/account-context'

export default function HomePage() {
  const { account } = useAccount()
  const [isMounted, setIsMounted] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // Agendar a atualização do estado de forma assíncrona para evitar renders em cascata (timer e rafId)
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
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl">Voce logou, estamos na home!</h1>
    </div>
  )
}

