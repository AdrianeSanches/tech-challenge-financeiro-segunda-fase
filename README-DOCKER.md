# Configuração Docker - Tech Challenge Financeiro Fase 2

Este documento explica como executar a arquitetura de microfrontends usando Docker.

## Arquitetura

- **lumen-host**: Host application (porta padrão Next.js: 3000)
- **funcionalidades-remote**: Remote application (porta 3001)

## Portas

- Host (lumen-host): `http://localhost:3000` (porta padrão Next.js)
- Remote (funcionalidades-remote): `http://localhost:3001`

## Resumo das Configurações

| Serviço | Porta | URL | Descrição |
|---------|-------|-----|-----------|
| **lumen-host** | 3000 | http://localhost:3000 | Host principal (porta padrão Next.js) |
| **funcionalidades-remote** | 3001 | http://localhost:3001 | Remote com microfrontends |

## Como executar

### Desenvolvimento Local

```bash
# Terminal 1 - Remote Application (porta 3001)
cd funcionalidades-remote
npm run dev

# Terminal 2 - Host Application (porta 3000)
cd lumen-host
NEXT_PUBLIC_REMOTE_URL=http://localhost:3001 npm run dev
```

### Com Docker

```bash
# Construir e executar
docker-compose up --build

# Ou em background
docker-compose up -d --build

# Parar containers
docker-compose down
```

### Desenvolvimento com Docker

```bash
# Usar configuração de desenvolvimento
docker-compose -f docker-compose.dev.yml up

# Ou em background
docker-compose -f docker-compose.dev.yml up -d
```

## Configurações importantes

- O host usa a **porta padrão do Next.js (3000)**
- O remote usa a **porta 3001** para evitar conflitos (configurado no package.json)
- **Importante**: Use sempre `npm run dev` ao invés de `next dev` diretamente
- Module Federation está configurado para usar URLs dinâmicas via `NEXT_PUBLIC_REMOTE_URL`
- Ambos os projetos usam `output: 'standalone'` para compatibilidade com Docker

## Troubleshooting

### Portas em uso
Se as portas 3000/3001 estiverem em uso, verifique se há processos Next.js rodando localmente:

**Portas padrão:**
- Host (lumen-host): 3000
- Remote (funcionalidades-remote): 3001

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Ou pare processos Next.js
taskkill /f /im node.exe
```

### Containers não sobem
```bash
# Ver logs
docker-compose logs

# Ver status dos containers
docker-compose ps

# Reconstruir
docker-compose up --build --force-recreate
```

### Module Federation não funciona
Verifique se:
1. O remote está saudável: `curl http://localhost:3001/static/chunks/remoteEntry.js`
2. O host consegue acessar o remote
3. As variáveis de ambiente estão corretas
