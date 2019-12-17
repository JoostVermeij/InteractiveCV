import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptipediaComponent } from './receptipedia.component';

describe('ReceptipediaComponent', () => {
  let component: ReceptipediaComponent;
  let fixture: ComponentFixture<ReceptipediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptipediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptipediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
