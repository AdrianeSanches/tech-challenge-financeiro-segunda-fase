import bcrypt from 'bcryptjs';

// Verifica se uma string é um hash bcrypt (começa com $2a$, $2b$ ou $2y$)
function isBcryptHash(str: string): boolean {
  return /^\$2[ayb]\$.{56}$/.test(str);
}

// Faz hash de senha
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compara senha com hash (com migração automática)
export async function comparePassword(
  inputPassword: string, 
  storedPassword: string
): Promise<{ matches: boolean; needsMigration: boolean }> {
  // Se storedPassword é hash bcrypt
  if (isBcryptHash(storedPassword)) {
    const matches = await bcrypt.compare(inputPassword, storedPassword);
    return { matches, needsMigration: false };
  }
  
  // Senão, é senha antiga em texto plano - comparar diretamente
  const matches = inputPassword === storedPassword;
  return { matches, needsMigration: matches };
}

// Migra senha antiga para hash
export async function migratePassword(oldPassword: string): Promise<string> {
  return hashPassword(oldPassword);
}

