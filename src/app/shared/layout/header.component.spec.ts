import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderComponent } from './header.component';
import { UserService, ApiService, JwtService, User } from '../../core';
import { ShowAuthedDirective } from '../../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, ShowAuthedDirective],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ApiService, JwtService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign out', inject([UserService], (userService: UserService) => {
    let currUser: any;
    userService.currentUser.subscribe(data => { currUser = data });
    expect(currUser).toBeDefined();
  }));
});
