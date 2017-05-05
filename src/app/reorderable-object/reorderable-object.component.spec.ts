import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderableObjectComponent } from './reorderable-object.component';

describe('ReorderableObjectComponent', () => {
  let component: ReorderableObjectComponent;
  let fixture: ComponentFixture<ReorderableObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderableObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderableObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
