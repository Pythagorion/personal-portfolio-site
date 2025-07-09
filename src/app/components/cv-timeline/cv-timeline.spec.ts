import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTimeline } from './cv-timeline';

describe('CvTimeline', () => {
  let component: CvTimeline;
  let fixture: ComponentFixture<CvTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
