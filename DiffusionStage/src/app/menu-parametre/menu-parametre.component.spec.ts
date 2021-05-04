import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuParametreComponent } from './menu-parametre.component';

describe('MenuParametreComponent', () => {
  let component: MenuParametreComponent;
  let fixture: ComponentFixture<MenuParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuParametreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
