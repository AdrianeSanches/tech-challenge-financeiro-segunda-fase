import CryptoJS from 'crypto-js';

// Chave de criptografia (em produção, deve vir de variável de ambiente)
const getEncryptionKey = (): string => {
  if (typeof window === 'undefined') return 'default-dev-key';
  return process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-dev-key';
};

// Verifica se uma string é JSON criptografado (começa com "U2FsdGVkX1")
function isEncrypted(str: string): boolean {
  try {
    return str.startsWith('U2FsdGVkX1');
  } catch {
    return false;
  }
}

// Criptografa dados
export function encryptStorage(data: any): string {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, getEncryptionKey()).toString();
  return encrypted;
}

// Descriptografa dados (com fallback para dados antigos)
export function decryptStorage(encrypted: string): any {
  try {
    // Se não parece criptografado, tentar parse direto (dados antigos)
    if (!isEncrypted(encrypted)) {
      return JSON.parse(encrypted);
    }
    
    // Tentar descriptografar
    const decrypted = CryptoJS.AES.decrypt(encrypted, getEncryptionKey());
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Falha ao descriptografar');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    // Se falhar, tentar como JSON direto (dados antigos)
    try {
      return JSON.parse(encrypted);
    } catch {
      throw new Error('Não foi possível descriptografar ou fazer parse dos dados');
    }
  }
}

// Wrapper seguro para localStorage.setItem
export function setSecureItem(key: string, value: any): void {
  try {
    const encrypted = encryptStorage(value);
    localStorage.setItem(key, encrypted);
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error);
    // Fallback: salvar sem criptografia se falhar
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Wrapper seguro para localStorage.getItem
export function getSecureItem<T = any>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const decrypted = decryptStorage(item);
    
    // Se dados não estavam criptografados, migrar automaticamente
    if (!isEncrypted(item)) {
      setSecureItem(key, decrypted);
    }
    
    return decrypted as T;
  } catch (error) {
    console.error(`Erro ao recuperar ${key}:`, error);
    // Fallback: tentar pegar como JSON direto
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
}

// Remover item
export function removeSecureItem(key: string): void {
  localStorage.removeItem(key);
}

