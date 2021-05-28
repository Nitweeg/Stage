import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataParametreComponent } from './data-parametre.component';

describe('DataParametreComponent', () => {
  let component: DataParametreComponent;
  let fixture: ComponentFixture<DataParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataParametreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
