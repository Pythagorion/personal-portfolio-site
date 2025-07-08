import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGrid } from './project-grid';

describe('ProjectGrid', () => {
  let component: ProjectGrid;
  let fixture: ComponentFixture<ProjectGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
