import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartcompComponent } from './linechartcomp.component';

describe('LinechartcompComponent', () => {
  let component: LinechartcompComponent;
  let fixture: ComponentFixture<LinechartcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinechartcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
