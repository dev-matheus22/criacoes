import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component ({
  selector: 'app-calculadora',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})

export class CalculadoraComponent {
  numero1: number = 0;
  numero2: number = 0;
  resultado: number = 0;

  calcularResultado(){
    this.resultado = this.numero1 + this.numero2;
  }

}