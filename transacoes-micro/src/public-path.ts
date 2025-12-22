// src/public-path.ts
declare var __webpack_public_path__: string;

if (typeof window !== 'undefined') {
  try {
    // Tenta encontrar o script que está rodando este código (o remoteEntry.js)
    let script: HTMLScriptElement | null = document.currentScript as HTMLScriptElement;

    // Fallback: se currentScript não estiver disponível, procura pelo script com data-webpack
    if (!script || !script.src) {
      const scripts = document.getElementsByTagName('script');
      for (let i = scripts.length - 1; i >= 0; i--) {
        const s = scripts[i];
        if (s.src && (s.src.includes('remoteEntry.js') || s.getAttribute('data-webpack'))) {
          script = s;
          break;
        }
      }
    }

    if (script && script.src) {
      // Pega a URL de onde o script veio (ex: http://localhost:4201/ ou http://meu-docker:80/)
      const url = new URL(script.src);
      // Define o caminho público base baseado nessa URL
      // Remove o nome do arquivo (remoteEntry.js) e mantém apenas o diretório
      const pathname = url.pathname.substring(0, url.pathname.lastIndexOf('/') + 1);
      __webpack_public_path__ = url.origin + pathname;
    } else {
      // Fallback: usa a origem atual como public path
      __webpack_public_path__ = window.location.origin + '/';
    }
  } catch (error) {
    // Em caso de erro, usa fallback seguro
    console.warn('Failed to set webpack public path:', error);
    __webpack_public_path__ = window.location.origin + '/';
  }
}
