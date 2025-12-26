import { Landmark, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAccount } from '@/contexts/account-context'
import { Button } from './ui/button'

export function Header() {
  const { account, logout } = useAccount()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <header className="bg-primary text-primary-foreground px-4 py-2 md:px-8 md:py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Landmark className="h-5 w-5 md:h-7 md:w-7 text-default-home" />
        <img
          src="/logo-destaque.png"
          alt="logo-destaque"
          className="h-[30px] md:h-[50px]"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-[6px] md:gap-[10px]">
          <Avatar className="h-7 w-7 md:h-10 md:w-10 border-2 border-primary-foreground/20">
            <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
              <User className="h-4 w-4 md:h-5 md:w-5" />
            </AvatarFallback>
          </Avatar>
          {account ? (
            <span>{account.userName.split(' ')[0]}</span>
          ) : (
            <span>Carregando...</span>
          )}
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="bg-transparent border-primary-foreground text-primary-foreground ml-[5px] md:ml-[40px]"
        >
          Sair
        </Button>
      </div>
    </header>
  )
}

