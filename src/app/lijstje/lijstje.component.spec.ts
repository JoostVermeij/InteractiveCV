import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LijstjeComponent } from './lijstje.component';

describe('LijstjeComponent', () => {
  let component: LijstjeComponent;
  let fixture: ComponentFixture<LijstjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LijstjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LijstjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
