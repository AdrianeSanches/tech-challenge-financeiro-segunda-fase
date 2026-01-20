import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockAccounts } from '@/lib/mock-data'
import { Account } from '@/lib/types'
import { useAccount } from '@/contexts/account-context'
import { comparePassword, migratePassword } from '@/lib/auth'
import { getSecureItem, setSecureItem } from '@/lib/storage'

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAccount()
  
  // useRouter não funciona quando o componente é usado dentro de um Dialog/Portal
  // usando usar window.location como substituição
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function handleLogin(data: LoginFormValues) {
    try {
      setIsLoading(true)
      await new Promise(async (resolve) => {
        let list

        try {
          const storedList = getSecureItem<Account[]>('accountsList') || mockAccounts
          list = Array.isArray(storedList) && storedList.length > 0 ? storedList : mockAccounts
        } catch {
          list = mockAccounts
        }

        const accountRegistered: Account[] = list.filter(
          (account: Account) => account.email === data.email,
        )

        if (accountRegistered?.length > 0) {
          // Comparar senha usando hash (com migração automática)
          const comparison = await comparePassword(
            data.password,
            accountRegistered[0].password
          )

          if (comparison.matches) {
            // Se precisa migrar, atualizar senha no localStorage
            if (comparison.needsMigration) {
              const hashedPassword = await migratePassword(data.password)
              accountRegistered[0].password = hashedPassword

              // Atualizar na lista de contas
              const updatedList = list.map((acc: Account) =>
                acc.accountNumber === accountRegistered[0].accountNumber
                  ? { ...acc, password: hashedPassword }
                  : acc
              )
              setSecureItem('accountsList', updatedList)
            }

            toast.success('Login efetuado com sucesso!', {
              description: 'Aguarde, você será redirecionado em breve.',
            })
            // Adicionar flag para indicar que estamos no meio de um processo de login
            localStorage.setItem('isLoggingIn', 'true')
            login(accountRegistered[0])
            setTimeout(() => {
              // Remover a flag antes de redirecionar
              localStorage.removeItem('isLoggingIn')
              window.location.href = '/home'
            }, 500)
          } else {
            toast.error('Erro ao fazer login', {
              description: 'E-mail ou senha inválidos. Tente novamente.',
            })
          }
        } else {
          toast.error('Erro ao fazer login', {
            description: 'E-mail ou senha inválidos. Tente novamente.',
          })
        }
        setTimeout(resolve, 500)
      })
    } catch {
      toast.error('Erro ao fazer login', {
        description: 'E-mail ou senha inválidos. Tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col gap-[4vh] mt-[2vh]">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-10"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              className="pl-10"
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Entrar
        </Button>
      </div>
    </form>
  )
}

