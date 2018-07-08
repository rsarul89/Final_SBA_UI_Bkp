import { async, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared';
import { UserService, ApiService, JwtService, User, CoreModule } from '../core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { Component } from '@angular/core';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let jwtService: JwtService = new JwtService();
    const mockUser: User = {
        user_id: 1,
        user_email: 'test@gmail.com',
        user_name: 'demouser',
        password: 'test123',
        token: 'juhjthtjhhklgbbfffkhhhjfjkfkfkhflffjfgryljfvbvbjfhfffrfrf'
    }

    let mockUserService = {
        attemptAuth(type, credentials): Observable<User> {
            jwtService.saveUser(credentials);
                return Observable.of(mockUser);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientModule, HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, FormsModule, SharedModule, CoreModule],
            providers: [ApiService, JwtService, { provide: UserService, useValue: mockUserService }, FormBuilder]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should login', async(inject([JwtService], (j) => {
        let response: any;
        component.title = 'login'
        component.authType = 'login';
        updateForm('demouser', 'test123','');
        spyOn(j, 'getUser').and.returnValue(response);
        //authComponent.submitForm();
        fixture.detectChanges();
        let el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
        fixture.detectChanges();
        let token = jwtService.getUser();
        expect(token.user_name).toBe('demouser');
    })));

    it('should register', async(inject([JwtService, UserService], (j:JwtService, u:UserService) => {
        let response: any;
        component.authForm.addControl('user_email', new FormControl());
        component.title = 'Register'
        component.authType = 'register';
        fixture.detectChanges();
        u.attemptAuth(component.authType, { token:'', user_name:'demouser1', user_email:'testmail@mail.com', password:'test123', user_id:2})
        .subscribe(data => {
          response = data;
        });
        fixture.detectChanges();
        spyOn(j, 'getUser').and.returnValue(response);
        //authComponent.submitForm();
        fixture.detectChanges();
        let el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
        fixture.detectChanges();
        let token = jwtService.getUser();
        expect(token.user_name).toEqual('demouser1');
    })));


    function updateForm(userName, userPassword, email) {
        component.authForm.controls['user_name'].setValue(userName);
        component.authForm.controls['password'].setValue(userPassword);    }
});
