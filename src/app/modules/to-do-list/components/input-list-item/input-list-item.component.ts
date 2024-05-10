import { Component, Input } from '@angular/core';

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
}
