import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedDashboardComponent } from './personalized-dashboard.component';

describe('PersonalizedDashboardComponent', () => {
  let component: PersonalizedDashboardComponent;
  let fixture: ComponentFixture<PersonalizedDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizedDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
