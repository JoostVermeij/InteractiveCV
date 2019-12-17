import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeelQuatroComponent } from './speel-quatro.component';

describe('SpeelQuatroComponent', () => {
  let component: SpeelQuatroComponent;
  let fixture: ComponentFixture<SpeelQuatroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeelQuatroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeelQuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
