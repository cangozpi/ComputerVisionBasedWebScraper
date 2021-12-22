import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAnswersComponent } from './forum-answers.component';

describe('ForumAnswersComponent', () => {
  let component: ForumAnswersComponent;
  let fixture: ComponentFixture<ForumAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
