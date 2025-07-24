import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { ItemLista } from './itemLista'


@Component ({
  selector: 'app-lista-compras',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.css'
})

export class ListaComprasComponent {
  item: string = '';
  lista: ItemLista[] = []; // Propriedades da classe

  adicionarItem(){
    let itemLista = new ItemLista();
    itemLista.nome = this.item;
    itemLista.id = this.lista.length + 1;

    this.lista.push(itemLista)

    this.item = '';

    console.table(this.lista)
  }

  riscarItem(itemLista: ItemLista){
    itemLista.comprado = !itemLista.comprado;
  }

  limparLista(){
    this.lista = [];
  }
}