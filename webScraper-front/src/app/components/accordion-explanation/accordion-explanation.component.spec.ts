import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionExplanationComponent } from './accordion-explanation.component';

describe('AccordionExplanationComponent', () => {
  let component: AccordionExplanationComponent;
  let fixture: ComponentFixture<AccordionExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
