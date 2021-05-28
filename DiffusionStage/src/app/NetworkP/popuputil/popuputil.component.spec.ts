import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuputilComponent } from './popuputil.component';

describe('PopuputilComponent', () => {
  let component: PopuputilComponent;
  let fixture: ComponentFixture<PopuputilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuputilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuputilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
