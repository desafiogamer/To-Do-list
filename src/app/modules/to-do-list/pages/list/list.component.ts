import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

//components
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ItemComponent } from '../../components/input-add/item/item.component';

//interfaces
import { outpuListItems } from '../../interface/outputList.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ItemComponent,
    InputListItemComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<outpuListItems[]>(this.#parseItem());
  public getListItems = this.#setListItems.asReadonly();

  #parseItem(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputAddItem(value: outpuListItems){
    localStorage.setItem('@my-list', JSON.stringify([...this.#setListItems(), value]));
    return this.#setListItems.set(this.#parseItem())
  }

  public deleteAllItems(){
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItem())
  }
}
