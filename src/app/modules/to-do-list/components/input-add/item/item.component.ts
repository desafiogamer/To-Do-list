import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';

//interfaces
import { outpuListItems } from '../../../interface/outputList.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  #cdr = inject(ChangeDetectorRef)

  @ViewChild("inputText") public inputText!: ElementRef

  @Input({required: true}) public inputListItems: outpuListItems[] = [];

  @Output() public outpuAddListItems = new EventEmitter<outpuListItems>()

  public focusAddItem(value:string){
    if(value){
      this.#cdr.detectChanges
      this.inputText.nativeElement.value = ""

      const currentDate = new Date()
      const timeStamp = currentDate.getTime()
      const id = `ID ${timeStamp}`

      this.outpuAddListItems.emit({
        id,
        checked: false,
        value
      })

      console.log(timeStamp)
      return this.inputText.nativeElement.focus()
    }
  }
}
