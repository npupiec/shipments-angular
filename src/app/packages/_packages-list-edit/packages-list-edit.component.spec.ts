import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesListEditComponent } from './-packages-list-edit.component';

describe('PackagesListEditComponent', () => {
  let component: PackagesListEditComponent;
  let fixture: ComponentFixture<PackagesListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
