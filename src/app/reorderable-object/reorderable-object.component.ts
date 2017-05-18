import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReorderableObject } from '../reorderable-object';

@Component({
  selector: 'app-reorderable-object',
  templateUrl: './reorderable-object.component.html',
  styleUrls: ['./reorderable-object.component.css']
})
export class ReorderableObjectComponent implements OnInit {

  @Input() reorderableObject: ReorderableObject;

  @Output() reorderableObjectDropped = new EventEmitter<any>();
  @Output() reorderableObjectMouseClick = new EventEmitter<any>();
  @Output() reorderableObjectMouseDown = new EventEmitter<any>();
  @Output() reorderableObjectOrdinalFocused = new EventEmitter<any>();
  @Output() reorderableObjectReordinated = new EventEmitter<any>();

  dropZoneActive: boolean = false;

  constructor() { }

  ngOnInit() {}

  handleDragStart(ev: any): void { 
    ev.dataTransfer.setData('Text', ev.target.id);
  }

  handleDragEnd(ev: any): void { this.dropZoneActive = false; }

  handleDragEnter(ev: any): void {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    if (!this.reorderableObject.selected) {
      this.dropZoneActive = true;
    }
  }

  handleDragOver(ev: any): void { ev.preventDefault(); }

  handleDragLeave(ev: any): void { this.dropZoneActive = false; }

  handleDrop(ev: any): void {
    this.dropZoneActive = false;
    let valueToEmit = {
      reorderableObject: this.reorderableObject,
      event: ev
    };
    this.reorderableObjectDropped.emit( valueToEmit );
  }

  handleMouseDown(ev: any): void {
    ev.stopPropagation();
    if (!this.isNotMouseLeftButtonEvent(ev)) {
      let valueToEmit = {
        reorderableObject: this.reorderableObject,
        event: ev
      };
      this.reorderableObjectMouseDown.emit( valueToEmit );
    }
  }

  handleMouseOver(ev: any): void {}

  handleMouseClick(ev: any): void {
    ev.stopPropagation();
    if (!this.isNotMouseLeftButtonEvent(ev)) {
      let valueToEmit = {
        reorderableObject: this.reorderableObject,
        event: ev
      };
      this.reorderableObjectMouseClick.emit( valueToEmit );
    }
  }

  handleBlur(ev: any): void {
    ev.target.value = this.reorderableObject.ordinal;
  }

  handleFocus(ev: any): void {
    let valueToEmit = {
      event: ev,
      reorderableObject: this.reorderableObject
    };
    this.reorderableObjectOrdinalFocused.emit(valueToEmit);
  }

  handleKeyPress(ev: any): void {
    if (ev.keyCode === 13) { // Enter key pressed
      let valueToEmit = {
        event: ev,
        reorderableObject: this.reorderableObject,
        originalOrdinal: this.reorderableObject.ordinal,
        newRequestedOrdinal: ev.target.value
      };
      this.reorderableObjectReordinated.emit( valueToEmit );
    }
  }

  doNotHandle(ev: any): void { ev.stopPropagation(); }

  isNotMouseLeftButtonEvent(ev: any): boolean {
		return ev.button !== 0;
	}

}
