import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopsocieteComponent } from './popsociete.component';

describe('PopsocieteComponent', () => {
  let component: PopsocieteComponent;
  let fixture: ComponentFixture<PopsocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopsocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopsocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
