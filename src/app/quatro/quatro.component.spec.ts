import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatroComponent } from './quatro.component';

describe('QuatroComponent', () => {
  let component: QuatroComponent;
  let fixture: ComponentFixture<QuatroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuatroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
