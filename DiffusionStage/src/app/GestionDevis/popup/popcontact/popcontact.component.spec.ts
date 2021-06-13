import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopcontactComponent } from './popcontact.component';

describe('PopcontactComponent', () => {
  let component: PopcontactComponent;
  let fixture: ComponentFixture<PopcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopcontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
