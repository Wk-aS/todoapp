import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoComponent } from './compo.component';

describe('CompoComponent', () => {
  let component: CompoComponent;
  let fixture: ComponentFixture<CompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
