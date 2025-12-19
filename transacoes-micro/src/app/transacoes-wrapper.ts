import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './app';
import 'zone.js';

export async function mount() {
  const app = await createApplication(appConfig);
  // Cria o componente principal e anexa ao corpo ou a um elemento específico se necessário
  const componentRef = app.bootstrap(App);
  return componentRef;
}
