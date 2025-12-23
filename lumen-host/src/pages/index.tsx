import { RegisterForm } from '@/components/register-form'
import { LoginForm } from '@/components/login-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  LogIn,
  UserPlus,
  Gift,
  HandCoins,
  Star,
  MonitorSmartphone,
  Landmark,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { InfosCard } from '@/components/infos-card'
import { useAccount } from '@/contexts/account-context'

export default function LoginPage() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { logout } = useAccount()

  useEffect(() => {
    // Agendar a atualização do estado de forma assíncrona para evitar renders em cascata
    requestAnimationFrame(() => {
      setIsMounted(true)
    })
    
    // Limpar currentAccount do localStorage quando a página de login for carregada, mas não limpar se estivermos no meio de um processo de login (redirecionamento)
    // Lógica que impede que o cliente que já tenha logado consiga voltar para a área logada sem efetuar login uma vez que tenha feito logout (seja pelo botão de logout ou colocando a url diretamente)
    if (typeof window !== 'undefined') {
      const isLoggingIn = localStorage.getItem('isLoggingIn')
      // Só limpar se não estivermos no meio de um processo de login
      if (!isLoggingIn) {
        localStorage.removeItem('currentAccount')
        // Também limpar o estado do contexto
        logout()
      }
    }
  }, [logout]) // Executa apenas uma vez no mount (ngOnInit), mas inclui logout para evitar warning

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground px-2 md:px-8 pb-4 pt-1 md:py-4 flex items-center flex-col md:flex-row gap-[8px] justify-between">
        <div className="flex items-center">
          <Landmark className="h-5 w-5 md:h-7 md:w-7 text-default-home" />
          <img
            src="/logo-destaque.png"
            alt="logo-destaque"
            className="h-[35px] md:h-[50px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsRegisterDialogOpen(true)}
            className="bg-primary-foreground text-primary border-2 border-transparent hover:bg-default-home hover:text-primary hover:border-default-home"
          >
            <UserPlus className="h-4 w-4" />
            Abra sua conta
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsLoginDialogOpen(true)}
            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-backoground-login-less hover:text-primary hover:border-backoground-login-less"
          >
            <LogIn className="h-4 w-4" />
            Entrar
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center bg-backoground-login bg-[linear-gradient(180deg,_rgba(84,_0,_87,_1)_0%,_rgba(255,_255,_205,_1)_70%,_rgba(255,_255,_255,_1)_100%)]">
        <div className="flex flex-col lg:flex-row gap-[12px] items-center p-[3%]">
          <h1 className="text-[16px] md:text-[22px] text-center font-normal md:font-semibold text-background">
            Experimente mais liberdade no controle da sua vida financeira.
            <br />
            Crie sua conta com a gente!
          </h1>
          <img src="/pessoas.png" alt="pessoas" />
        </div>
        <h2 className="text-[16px] md:text-[18px] font-medium mt-[2vh] md:mt-[0vh] mb-[3vh]">
          Vantagens do nosso banco
        </h2>
        <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-[20px] pt-[0] px-[3%] pb-[5%] md:pb-[3%]">
          <InfosCard
            title="Conta e cartão gratuitos"
            Svg={Gift}
            description="Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso:
              sem tarifa de manutenção."
          />
          <InfosCard
            title="Saques sem custo"
            Svg={HandCoins}
            description="Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
          />
          <InfosCard
            title="Programa de pontos"
            Svg={Star}
            description="Você pode acumular pontos com suas compras no crédito sem pagar
              mensalidade!"
          />
          <InfosCard
            title="Seguro Dispositivos"
            Svg={MonitorSmartphone}
            description="Seus dispositivos móveis (computador e laptop) protegidos por uma
              mensalidade simbólica."
          />
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground px-8 py-4 flex items-center justify-evenly">
        <div>
          <h1 className="text-[14px] font-bold">Serviços</h1>
          <p className="text-[12px]">Conta Corrente</p>
          <p className="text-[12px]">Conta PJ</p>
          <p className="text-[12px]">Cartão de Crédito</p>
        </div>

        <div>
          <h1 className="text-[14px] font-bold">Contatos</h1>
          <p className="text-[12px]">0800 486 345 02</p>
          <p className="text-[12px]">suporte@lumenfinancial.com.br</p>
          <p className="text-[12px]">ouvidoria@lumenfinancial.com.br</p>
        </div>
      </footer>

      {!isMounted ? null : (
        <>
          {/* Diálogo de Cadastro */}
          <Dialog
            open={isRegisterDialogOpen}
            onOpenChange={setIsRegisterDialogOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Abrir nova Conta</DialogTitle>
                <DialogDescription>
                  Preencha o formulário abaixo para se cadastrar.
                </DialogDescription>
              </DialogHeader>
              <RegisterForm onSuccess={() => setIsRegisterDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Diálogo de Login */}
          <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Acessar sua Conta</DialogTitle>
              </DialogHeader>
              <LoginForm />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
