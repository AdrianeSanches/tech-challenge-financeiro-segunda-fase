import Link from 'next/link'
import { Home, ArrowLeftRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'Início', href: '/home', icon: Home },
  { name: 'Transações', href: '/transacoes', icon: ArrowLeftRight },
  { name: 'Investimentos', href: '/investimentos', icon: TrendingUp },
]

export function Sidebar() {
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    // Inicializar pathname apenas no cliente
    if (typeof window !== 'undefined') {
      // Agendar a atualização do estado de forma assíncrona para evitar renders em cascata
      const rafId = requestAnimationFrame(() => {
        setPathname(window.location.pathname)
      })
      
      // Atualizar quando a rota mudar (popstate para navegação do browser)
      const handlePopState = () => {
        requestAnimationFrame(() => {
          setPathname(window.location.pathname)
        })
      }
      
      window.addEventListener('popstate', handlePopState)
      
      // Para navegação via Next.js Link, verificar periodicamente
      // (Next.js Link não atualiza window.location imediatamente)
      const checkPathname = () => {
        const current = window.location.pathname
        setPathname((prev) => {
          if (current !== prev) {
            return current
          }
          return prev
        })
      }
      
      const interval = setInterval(checkPathname, 100)
      
      return () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('popstate', handlePopState)
        clearInterval(interval)
      }
    }
  }, [])

  // Usar o estado pathname que é atualizado pelos listeners
  const currentPathname = typeof window !== 'undefined' ? pathname : ''

  return (
    <aside className="w-full md:w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <nav className="flex-1 py-2 px-6 md:p-6 space-y-2">
        {navigation.map((item) => {
          const isActive = currentPathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent-foreground-10 text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground-70 hover:bg-sidebar-accent-50 hover:text-sidebar-foreground',
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

