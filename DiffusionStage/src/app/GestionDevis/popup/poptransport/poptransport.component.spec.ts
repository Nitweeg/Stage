import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoptransportComponent } from './poptransport.component';

describe('PoptransportComponent', () => {
  let component: PoptransportComponent;
  let fixture: ComponentFixture<PoptransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoptransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoptransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
