import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainTextComponent } from './news-main-text.component';

describe('NewsMainTextComponent', () => {
  let component: NewsMainTextComponent;
  let fixture: ComponentFixture<NewsMainTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMainTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMainTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
