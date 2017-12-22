import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTeacherComponent } from './top-teacher.component';

describe('TopTeacherComponent', () => {
  let component: TopTeacherComponent;
  let fixture: ComponentFixture<TopTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
