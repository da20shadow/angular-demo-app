import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTasksComponent } from './goal-tasks.component';

describe('GoalTasksComponent', () => {
  let component: GoalTasksComponent;
  let fixture: ComponentFixture<GoalTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
