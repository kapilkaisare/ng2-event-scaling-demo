import { Component, OnInit } from '@angular/core';
import { ReorderableObject } from '../reorderable-object';
import { ReorderableObjectService } from '../reorderable-object.service';

@Component({
  selector: 'app-reordering-container',
  templateUrl: './reordering-container.component.html',
  styleUrls: ['./reordering-container.component.css']
})
export class ReorderingContainerComponent implements OnInit {
  private rangeSelectionCenter: ReorderableObject;
  private reorderableObjectSelectedOnLastMouseDown: ReorderableObject;
  private reorderableObjects: ReorderableObject[] = [];
  private selectedReorderableObjects: ReorderableObject[] = [];

  constructor(private reorderableObjectService: ReorderableObjectService) { }

  ngOnInit() { 
    this.reorderableObjects = this.reorderableObjectService.getObjects('medium');
  }

  handleMouseDown(ev: any): void { }

  changeLoad(size: string): void {
    this.reorderableObjects = this.reorderableObjectService.getObjects(size);
  }

  handleReorderableObjectDropped(ev: any): void { 
    let indexToInsert;
    let selectedReorderableObjects = [];

    if (ev.reorderableObject.selected) return;

    for (let i: number = 0; i < this.reorderableObjects.length; i++) {
      if (this.reorderableObjects[i].selected) {
        selectedReorderableObjects.push(this.reorderableObjects.splice(i, 1)[0]);
        i = i - 1;
      }
    }

    for (let i: number = 0; i < this.reorderableObjects.length; i++) {
      if (this.reorderableObjects[i].ordinal === ev.reorderableObject.ordinal) {
        indexToInsert = i;
        break;
      }
    }

    selectedReorderableObjects.forEach((oc: ReorderableObject) => {
      this.reorderableObjects.splice(indexToInsert, 0, oc);
      indexToInsert = indexToInsert + 1;
    });

    this.recomputeOrdinals();
  }

  handleReorderableObjectMouseClick(ev: any): void {
    let pointedReorderableObject = ev.reorderableObject;
    if (this.isMultipleSelectionEvent(ev.event)) {
      if (this.selectedReorderableObjects.length > 1 &&
        this.findInSelection(pointedReorderableObject) >= -1 &&
        this.reorderableObjectSelectedOnLastMouseDown !== pointedReorderableObject) {
        this.deselectReorderableObject(pointedReorderableObject);
      }
    } else if (!this.isRangeSelectionEvent(ev.event)) {
      this.clearSelection();
      this.pinReorderableObjectOnMouseDown(pointedReorderableObject);
    }
    this.reorderableObjectSelectedOnLastMouseDown = null;
  }

  handleReorderableObjectMouseDown(ev: any): void {
		let pointedReorderableObject: ReorderableObject = ev.reorderableObject;

		if (this.isMultipleSelectionEvent(ev.event)) {
			if (this.findInSelection(pointedReorderableObject) === -1 ) {
				this.pinReorderableObjectOnMouseDown(pointedReorderableObject);
			}
		} else if (this.isRangeSelectionEvent(ev.event)) {
			if (this.selectedReorderableObjects.length === 0) {
				this.pinReorderableObjectOnMouseDown(pointedReorderableObject);
			} else {
				this.selectRangeTo(pointedReorderableObject);
			}
		} else {
			if (this.findInSelection(pointedReorderableObject) === -1) {
				this.clearSelection();
				this.selectReorderableObject(pointedReorderableObject);
			}
		}
  }

  handleReorderableObjectOrdinalFocused(ev: any): void {
		this.clearSelection();
		this.selectReorderableObject(ev.reorderableObject);
  }

  handleReorderableObjectReordinated(ev: any): void {
		let pointedReorderableObject = ev.reorderableObject;
		let requestedPosition = ev.newRequestedOrdinal;

		this.clearSelection();
		this.selectReorderableObject(ev.reorderableObject);
		if (requestedPosition < 1 ||
			requestedPosition > this.reorderableObjects.length) {
			pointedReorderableObject.ordinal = ev.originalOrdinal;
			ev.event.path[0].value = ev.originalOrdinal;
		} else {
			this.moveSelectedReorderableObjectsTo(requestedPosition);
		}
		ev.event.preventDefault();
  }

  private addToSelection(ro: ReorderableObject): void {
    const idx = this.findInSelection(ro);
    if (idx < 0) {
      this.selectedReorderableObjects.push(ro);
    }
  }
  
  private clearSelection(): void {
    this.selectedReorderableObjects.forEach((ro: ReorderableObject) => {
      ro.selected = false;
    });
    this.selectedReorderableObjects = [];
  }

  private deselectReorderableObject(ro: ReorderableObject): void {
    ro.selected = false;
    this.removeFromSelection(ro);
  }

  private findInSelection(ro: ReorderableObject): number {
    return this.selectedReorderableObjects.findIndex((current: ReorderableObject) => {
      return current === ro;
    });
  }

  private isMultipleSelectionEvent(ev: any): boolean {
    return ev.ctrlKey;
  }

  private isRangeSelectionEvent(ev: any): boolean {
    return ev.shiftKey;
  }

  private moveSelectedReorderableObjectsTo(position: number): void {
		let that = this;
		let orderedChannelAtTargetPosition = this.reorderableObjects[position - 1];
		let indexToInsert;

		this.selectedReorderableObjects.forEach((ro: ReorderableObject) => {
			let idx = that.reorderableObjects.findIndex((current: ReorderableObject) => {
				return current === ro;
			});

			if (idx > -1) {
				that.reorderableObjects.splice(idx, 1);
			}
		});

		for (let i: number = 0; i < this.reorderableObjects.length; i++) {
			if (this.reorderableObjects[i] === orderedChannelAtTargetPosition) {
				indexToInsert = i;
				break;
			}
		}

		this.selectedReorderableObjects.forEach((oc: ReorderableObject) => {
			that.reorderableObjects.splice(indexToInsert, 0, oc);
			indexToInsert = indexToInsert + 1;
		});

		this.recomputeOrdinals();
  }

  private pinReorderableObject(ro: ReorderableObject): void {
    this.selectReorderableObject(ro);
    this.rangeSelectionCenter = ro;
  }

  private pinReorderableObjectOnMouseDown(ro: ReorderableObject): void {
    this.pinReorderableObject(ro);
    this.reorderableObjectSelectedOnLastMouseDown = ro;
  }

  private recomputeOrdinals(): void {
    for (let i: number = 0; i < this.reorderableObjects.length; i++) {
      this.reorderableObjects[i].ordinal = i + 1;
    }
  }

  private removeFromSelection(ro: ReorderableObject): void {
    const idx: number = this.findInSelection(ro);
    if (idx > -1) {
      this.selectedReorderableObjects.splice(idx, 1);
    }
  }

  private selectRangeTo(ro: ReorderableObject): void {
    let idx1 = ro.ordinal;
    let idx2 = this.rangeSelectionCenter.ordinal;
    let from: number, to: number;
    if (idx1 > idx2) {
      from = idx2;
      to = idx1;
    } else {
      from = idx1;
      to = idx2;
    }
    this.clearSelection();
    for (let i: number = from; i <= to; i++) {
      this.selectReorderableObject(this.reorderableObjects[i - 1]);
    }
  }

  private selectReorderableObject(ro: ReorderableObject): void {
    ro.selected = true;
    this.addToSelection(ro);
  }

}
