import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopkitComponent } from './popkit.component';

describe('PopkitComponent', () => {
  let component: PopkitComponent;
  let fixture: ComponentFixture<PopkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopkitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
