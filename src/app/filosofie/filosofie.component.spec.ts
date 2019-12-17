import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilosofieComponent } from './filosofie.component';

describe('FilosofieComponent', () => {
  let component: FilosofieComponent;
  let fixture: ComponentFixture<FilosofieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilosofieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilosofieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
