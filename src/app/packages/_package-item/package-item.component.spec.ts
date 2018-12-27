import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackgeItemComponent } from './packge-item.component';

describe('PackgeItemComponent', () => {
  let component: PackgeItemComponent;
  let fixture: ComponentFixture<PackgeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackgeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackgeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
