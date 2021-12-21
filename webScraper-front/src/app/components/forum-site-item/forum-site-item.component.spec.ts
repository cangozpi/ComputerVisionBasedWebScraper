import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSiteItemComponent } from './forum-site-item.component';

describe('ForumSiteItemComponent', () => {
  let component: ForumSiteItemComponent;
  let fixture: ComponentFixture<ForumSiteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSiteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSiteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
