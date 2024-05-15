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

  public ListItemsStage(value:'pending' | 'completetd'){
    return this.getListItems().filter((res: outpuListItems) => {
      if(value === 'pending'){
        return !res.checked;
      }

      if(value === 'completetd'){
        return res.checked;
      }

      return res
    })
  }

  public updateItemCheckbox(newItem: {id:string, checked:boolean}){
    this.#setListItems.update((oldValue: outpuListItems[])=>{
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked

          return res
        }
        return res
      });

      return oldValue
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))

  }

  public updateItemText(newItem: {id: string, value:string}){
    this.#setListItems.update((oldValue: outpuListItems[])=>{
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.value = newItem.value

          return res
        }
        return res
      });

      return oldValue
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))
  }

  public deleteItemText(id: string){
    this.#setListItems.update((oldValue: outpuListItems[]) => {
      return oldValue.filter((res)=> res.id !== id)
    });

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()));
  }

  public deleteAllItems(){
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItem())
  }
}
