import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopchantierComponent } from './popchantier.component';

describe('PopchantierComponent', () => {
  let component: PopchantierComponent;
  let fixture: ComponentFixture<PopchantierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopchantierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopchantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
