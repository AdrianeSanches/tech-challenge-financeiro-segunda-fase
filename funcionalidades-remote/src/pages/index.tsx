export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Funcionalidades Remote</h1>
        <p className="text-muted-foreground">
          Este é o remote Next.js para funcionalidades.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Os componentes estão expostos via Module Federation e devem ser consumidos pelo host.
        </p>
      </div>
    </div>
  );
}

