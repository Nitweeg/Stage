import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopmatComponent } from './popmat.component';

describe('PopmatComponent', () => {
  let component: PopmatComponent;
  let fixture: ComponentFixture<PopmatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopmatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
