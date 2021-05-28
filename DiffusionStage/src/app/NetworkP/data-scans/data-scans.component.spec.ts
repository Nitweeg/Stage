import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataScansComponent } from './data-scans.component';

describe('DataScansComponent', () => {
  let component: DataScansComponent;
  let fixture: ComponentFixture<DataScansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataScansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
