import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNavigationComponent } from './private-navigation.component';

describe('PrivateNavigationComponent', () => {
  let component: PrivateNavigationComponent;
  let fixture: ComponentFixture<PrivateNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
