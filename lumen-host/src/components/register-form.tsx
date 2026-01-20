import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { mockAccounts } from '@/lib/mock-data'
import { Account } from '@/lib/types'
import { hashPassword } from '@/lib/auth'
import { getSecureItem, setSecureItem } from '@/lib/storage'

const registerSchema = z
  .object({
    nome: z
      .string()
      .min(1, { message: 'O nome é obrigatório.' })
      .refine(
        (nome) => nome.trim().split(/\s+/).length >= 2,
        { message: 'Digite seu nome completo.' }
      ),
    email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha.' }),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos para criar a conta.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      nome: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const termsAccepted = watch('terms')
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const nome = watch('nome')
  const email = watch('email')
  
  // Verificar se as senhas coincidem para habilitar o botão
  const passwordsMatch = password === confirmPassword && password !== '' && confirmPassword !== ''
  
  // Verificar se o nome tem pelo menos 2 palavras
  const nomeCompleto = nome?.trim().split(/\s+/).filter(word => word.length > 0).length >= 2
  
  // Verificar se o email é válido (sem erro de validação)
  const emailValido = !errors.email && email && email.includes('@') && email.includes('.')

  async function handleRegister(data: RegisterFormValues) {
    setIsLoading(true)

    let list

    try {
      const storedList = getSecureItem<Account[]>('accountsList') || mockAccounts
      list = Array.isArray(storedList) && storedList.length > 0 ? storedList : mockAccounts
    } catch {
      list = mockAccounts
    }

    const accountExists = list.some(
      (account: Account) => account.email === data.email,
    )

    if (accountExists) {
      toast.error('Não é possível fazer o cadastro com o e-mail solicitado', {
        description: 'Este e-mail já está em uso.',
      })

      setIsLoading(false)
    } else {
      const randomNumber: number = Math.floor(Math.random() * 10000)
      const randomString: string =
        randomNumber.toString().padStart(4, '0') + '-1'

      // Fazer hash da senha antes de salvar
      const hashedPassword = await hashPassword(data.password)

      const newAccount: Account = {
        balance: 0,
        accountNumber: randomString,
        userName: data.nome,
        email: data.email,
        password: hashedPassword, // Armazenar hash, não texto plano
        transactions: [],
      }

      list.push(newAccount)
      setSecureItem('accountsList', list)

      toast.success('Conta criada com sucesso!', {
        description: 'Efetue o login para acessar sua nova conta',
      })

      setIsLoading(false)

      setTimeout(() => {
        onSuccess()
        reset()
        clearErrors()
      }, 1500)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="flex flex-col gap-[4vh] mt-[2vh]">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome</Label>{' '}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              className="pl-10"
              {...register('nome')}
            />
          </div>
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

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
              placeholder="Digite a sua senha"
              className="pl-10"
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite a sua senha novamente"
              className="pl-10"
              {...register('confirmPassword')}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked: boolean) => {
                setValue('terms', checked, { shouldValidate: true })
              }}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eu aceito os termos e condições.
            </Label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!termsAccepted || !passwordsMatch || !nomeCompleto || !emailValido || isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Criar conta
        </Button>
      </div>
    </form>
  )
}

