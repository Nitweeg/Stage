import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUtilComponent } from './data-util.component';

describe('DataUtilComponent', () => {
  let component: DataUtilComponent;
  let fixture: ComponentFixture<DataUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUtilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
