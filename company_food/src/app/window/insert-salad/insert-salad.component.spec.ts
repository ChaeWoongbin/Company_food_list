import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSaladComponent } from './insert-salad.component';

describe('InsertSaladComponent', () => {
  let component: InsertSaladComponent;
  let fixture: ComponentFixture<InsertSaladComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertSaladComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSaladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
