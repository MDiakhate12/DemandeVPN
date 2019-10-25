import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProlongationComponent } from './dialog-prolongation.component';

describe('DialogProlongationComponent', () => {
  let component: DialogProlongationComponent;
  let fixture: ComponentFixture<DialogProlongationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProlongationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProlongationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
