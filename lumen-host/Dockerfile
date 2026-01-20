# ==========================================
# Stage 1: Dependencies
# ==========================================
FROM node:20-alpine AS deps

WORKDIR /app

# Atualiza pacotes do Alpine para corrigir vulnerabilidades
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

# Copia arquivos de dependência
COPY package.json package-lock.json ./

# Instala dependências (incluindo devDependencies para build)
RUN npm ci

# ==========================================
# Stage 2: Builder
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Atualiza pacotes do Alpine para corrigir vulnerabilidades
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

# Copia dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Define variáveis de ambiente para build
# A URL do remote pode ser sobrescrita em runtime
ARG NEXT_PUBLIC_REMOTE_URL=http://funcionalidades-remote:3000
ENV NEXT_PUBLIC_REMOTE_URL=${NEXT_PUBLIC_REMOTE_URL}

# Desabilita telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build da aplicação
RUN npm run build

# ==========================================
# Stage 3: Runner
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Atualiza pacotes do Alpine para corrigir vulnerabilidades
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

# Define NODE_ENV como production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia arquivos necessários para produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Define permissões
RUN chown -R nextjs:nodejs /app

# Muda para usuário não-root
USER nextjs

# Expõe porta padrão do Next.js
EXPOSE 3000

# Define variável de ambiente para porta
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando de inicialização
CMD ["node", "server.js"]
