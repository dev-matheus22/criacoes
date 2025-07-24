  import { bootstrapApplication } from '@angular/platform-browser';
  import { Component } from '@angular/core';
  import { CalculadoraComponent } from './calculadora/calculadora.component';
  import {ListaComprasComponent} from './lista-compras/lista-compras.component';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [ CalculadoraComponent], // importa corretamente o componente standalone
    template: `
      <app-calculadora></app-calculadora>
    `
  })
  export class AppComponent {}

  bootstrapApplication(AppComponent);
