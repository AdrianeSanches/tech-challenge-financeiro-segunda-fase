import { AppLayout } from '@/components/app-layout'
import InvestimentosMicroFrontend from '@/components/InvestimentosMicroFrontend'
import { useEffect, useState } from 'react'
import { useAccount } from '@/contexts/account-context'

export default function InvestimentosPage() {
  const { account } = useAccount()
  const [isMounted, setIsMounted] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    const rafId: number = requestAnimationFrame(() => {
      setIsMounted(true)
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
    if (isMounted && hasChecked && account === null) {
      window.location.href = '/'
    }
  }, [account, isMounted, hasChecked])

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
      <InvestimentosMicroFrontend />
    </AppLayout>
  )
}


