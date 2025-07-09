import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSection } from './cv-section';

describe('CvSection', () => {
  let component: CvSection;
  let fixture: ComponentFixture<CvSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
