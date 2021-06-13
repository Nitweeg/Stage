import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopcondiComponent } from './popcondi.component';

describe('PopcondiComponent', () => {
  let component: PopcondiComponent;
  let fixture: ComponentFixture<PopcondiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopcondiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopcondiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
