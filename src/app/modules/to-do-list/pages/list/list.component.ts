import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

//components
import { ItemComponent } from '../../components/input-add/item/item.component';

//interfaces
import { outpuListItems } from '../../interface/outputList.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ItemComponent
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
}
