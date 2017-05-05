import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderingContainerComponent } from './reordering-container.component';

describe('ReorderingContainerComponent', () => {
  let component: ReorderingContainerComponent;
  let fixture: ComponentFixture<ReorderingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
