import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSiteItemComponent } from './news-site-item.component';

describe('NewsSiteItemComponent', () => {
  let component: NewsSiteItemComponent;
  let fixture: ComponentFixture<NewsSiteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsSiteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSiteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
