import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Landmark } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground px-8 py-4 flex items-center justify-center md:justify-start">
        <div className="flex items-center">
          <Landmark className="h-7 w-7 text-default-home" />
          <img
            src="/logo-destaque.png"
            alt="logo-destaque"
            className="h-[50px]"
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center bg-backoground-login bg-[linear-gradient(180deg,_rgba(84,_0,_87,_1)_0%,_rgba(255,_255,_205,_1)_70%,_rgba(255,_255,_255,_1)_100%)]">
        <div className="flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-[25px] md:text-4xl font-bold mb-4">
            Oops! Página Não Encontrada
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Parece que você se perdeu... A página que você procura não existe.
          </p>
          <Link href="/">
            <Button>Voltar para a Página Inicial</Button>
          </Link>
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
    </div>
  )
}