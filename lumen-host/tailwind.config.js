/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    // Em desenvolvimento local, isso permite que o Tailwind veja as classes do remote
    "../funcionalidades-remote/src/**/*.{js,ts,jsx,tsx,html}",
  ],
  // Em produção (Docker), o caminho acima não existe dentro do container,
  // então usamos o safelist para garantir que as classes usadas no remote
  // (especialmente as de transações) sejam sempre geradas.
  safelist: [
    // Texto
    'text-transaction-success',
    'text-transaction-transfer',
    'text-transaction-transfer-info',
    'text-transaction-payment',
    'text-transaction-withdraw',
    // Background
    'bg-transaction-success',
    'bg-transaction-transfer',
    'bg-transaction-transfer-info',
    'bg-transaction-payment',
    'bg-transaction-withdraw',
    // Background com opacidade (usado nos badges)
    {
      pattern: /^bg-transaction-(success|transfer|transfer-info|payment|withdraw)\/\d+$/,
    },
    // Borda
    'border-transaction-success',
    'border-transaction-transfer',
    'border-transaction-transfer-info',
    'border-transaction-payment',
    'border-transaction-withdraw',
    // Padrão geral para garantir qualquer variação restante
    {
      pattern: /^(bg|text|border)-(transaction-(success|transfer|transfer-info|payment|withdraw))(\/\d+)?$/,
    },
    // Classes arbitrárias com variáveis CSS usadas nas categorias
    'bg-[var(--transaction-success)]',
    'bg-[var(--transaction-transfer-info)]',
    'bg-[var(--transaction-payment)]',
    'bg-[var(--transaction-withdraw)]',
    // Padrão para capturar qualquer classe arbitrária com variáveis CSS de transação
    // Escapando colchetes e parênteses no regex
    {
      pattern: /^bg-\[var\(--transaction-(success|transfer-info|payment|withdraw)\)\]$/,
      variants: [],
    },
    // Classes de texto para categoria
    'text-white',
    'border-0',
    // Classes base do Badge (necessárias para categoria renderizar corretamente)
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'px-2',
    'py-0.5',
    'font-medium',
    'w-fit',
    'whitespace-nowrap',
    'shrink-0',
    'overflow-hidden',
    // Layout e Grid
    'grid',
    'grid-cols-1',
    'flex',
    'flex-col',
    'flex-wrap',
    'items-center',
    'justify-between',
    'justify-end',
    'relative',
    'absolute',
    // Responsive grid
    'md:grid-cols-2',
    'lg:grid-cols-4',
    // Espaçamento (gap)
    'gap-1',
    'gap-2',
    'gap-3',
    'gap-4',
    'gap-[10px]',
    // Espaçamento (space-y)
    'space-y-2',
    'space-y-3',
    'space-y-4',
    // Margens
    'mb-1',
    'mb-2',
    'mb-6',
    'mt-1',
    'mt-4',
    // Padding
    'pt-4',
    'pt-6',
    'pb-0',
    'py-4',
    'py-12',
    'px-2',
    'px-3',
    'pl-9',
    'pl-10',
    // Position
    'left-3',
    'top-1/2',
    'top-4',
    'right-4',
    // Transform
    'transform',
    '-translate-y-1/2',
    'translate-x-[-50%]',
    'translate-y-[-50%]',
    // Overflow (para scroll do modal)
    'overflow-y-auto',
    'overflow-x-hidden',
    // Max height (para modal)
    'max-h-[90vh]',
    // Width e Height
    'w-9',
    'h-4',
    'h-9',
    'w-4',
    // Responsive max-width
    'sm:max-w-md',
    'sm:max-w-lg',
    'sm:text-left',
    'sm:flex-row',
    // Border top para separação
    'border-t',
    // Flex utilities
    'flex-1',
    // Text utilities
    'text-center',
    'text-sm',
    'text-xs',
    'text-lg',
    'font-medium',
    'font-semibold',
    'font-bold',
    'text-muted-foreground',
    // Size utilities
    'w-full',
    'w-fit',
    'h-full',
    'min-w-0',
    // Border e background
    'bg-transparent',
    'border',
    'rounded-md',
    'rounded-lg',
    'rounded-xs',
    'shadow-xs',
    'shadow-md',
    'shadow-lg',
    // Opacity e transitions
    'opacity-70',
    'opacity-50',
    'transition-opacity',
    'hover:opacity-100',
    // Cursor e disabled
    'cursor-not-allowed',
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    // Z-index
    'z-50',
    // Position
    'fixed',
    'inset-0',
    // Sizing específicos
    'size-4',
    // Classes para Select e Input (w-fit é usado no SelectTrigger)
    'w-fit',
    'items-center',
    'justify-between',
    'whitespace-nowrap',
    // Text formatting
    'line-clamp-1',
    'truncate',
    // Max width calculado (usado no Dialog)
    'max-w-[calc(100%-2rem)]',
    // Min width
    'min-w-[8rem]',
    // Min height (usado para scroll do modal)
    'min-h-0',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          'foreground-70': 'var(--sidebar-foreground-70)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-50': 'var(--sidebar-accent-50)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          'accent-foreground-10': 'var(--sidebar-accent-foreground-10)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        'default-home': 'var(--default-home)',
        'backoground-login': 'var(--backoground-login)',
        'backoground-login-less': 'var(--backoground-login-less)',
        'text-infos': 'var(--text-infos)',
        'transaction-success': 'var(--transaction-success)',
        'transaction-transfer': 'var(--transaction-transfer)',
        'transaction-transfer-info': 'var(--transaction-transfer-info)',
        'transaction-payment': 'var(--transaction-payment)',
        'transaction-withdraw': 'var(--transaction-withdraw)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

