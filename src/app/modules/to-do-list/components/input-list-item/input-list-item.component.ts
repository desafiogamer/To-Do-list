import { Component, EventEmitter, Input, Output } from '@angular/core';

//interface
import { outpuListItems } from '../../interface/outputList.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.css'
})
export class InputListItemComponent {
  @Input({required: true}) public inputListItems: outpuListItems[] = [];

  @Output() public outputUpadateItemCheckbox = new EventEmitter<{checked: boolean, id: string}>()

  public upadateItemCheckbox(checked: boolean, id: string){
    return this.outputUpadateItemCheckbox.emit({id, checked})
  }


  @Output() public outputUpadateItemText = new EventEmitter<{id: string, value:string}>()

  public upadateItemText(id: string, value: string){
    return this.outputUpadateItemText.emit({id, value})
  }

}

