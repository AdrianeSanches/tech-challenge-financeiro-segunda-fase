declare module 'transacoesMicro/TransacoesApp' {
  // Define que o módulo exporta uma função chamada 'mount' para montar o Angular
  // Retorna uma Promise com a referência do componente montado
  export function mount(element: HTMLElement): Promise<unknown>;
  
  // Função opcional para desmontar o Angular (cleanup)
  export function unmount(): Promise<void>;
}