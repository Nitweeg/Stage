import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarreComponent } from './tool-barre.component';

describe('ToolBarreComponent', () => {
  let component: ToolBarreComponent;
  let fixture: ComponentFixture<ToolBarreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
