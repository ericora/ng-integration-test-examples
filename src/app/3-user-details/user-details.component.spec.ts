import { ActivatedRoute, Router } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';

class RouterStub {
  navigate(params) {}
}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        {
          provide: Router,
          useClass: RouterStub,
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should redirect the user to the users page after saving', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.save();
    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate to the not found page when an invalid user id is passed ', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    let route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
    route.push({ id: 0 });
    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
