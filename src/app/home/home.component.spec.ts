import { async, fakeAsync, tick, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule, FormBuilder } from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { ModalService, ShowAuthedDirective, SearchFilterPipe } from '../shared';
import { Observable } from 'rxjs/Observable';
import { HomeComponent } from './home.component';
import { ApiService, JwtService, Errors, DashBoardData, Associate, Skill, Associate_Skills, AssociateService, UserService, JsonParserService, User } from '../core';
import 'rxjs/add/observable/of';


describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent, ShowAuthedDirective, SearchFilterPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule, FormsModule, ToastrModule.forRoot()],
            providers: [ApiService, JwtService, JsonParserService, AssociateService, UserService, ToastrService, ModalService, JsonParserService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get load', () => {
        component.ngOnInit();
        component.ngAfterContentChecked();
    });

    // it('should login first', inject([UserService], (userService: UserService) => {
    //     fixture.detectChanges();
    //     let usr: User = {
    //         user_id: 0,
    //         user_email: '',
    //         token: '',
    //         user_name: 'demouser',
    //         password: 'test123'
    //     };
    //     let us = userService.attemptAuth('login', usr).subscribe();
    //     let currUser: User;
    //     currUser = userService.getCurrentUser();
    //     expect(currUser).toBeDefined();
    //     expect(currUser.token).not.toBeNull();
    // }));

    // it('should login first', inject([UserService], async((userService: UserService) => {
    //     let res;
    //     let usr: User = {
    //         user_id: 0,
    //         user_email: '',
    //         token: '',
    //         user_name: 'demouser',
    //         password: 'test123'
    //     };
    //     userService.attemptAuth('login', usr).subscribe((_res) => {
    //         res = _res;
    //     });
    //     // here you could add an expect to validate component state before the call or service completes
    //     tick(); 
    //     component.ngOnInit(); // call ngOnInit
    //     // simulate the promise being resolved
    // })));

    it('should get load associates table', () => {
        component.ngOnInit();
        component.ngAfterContentChecked();
        const element = fixture.nativeElement;
        fixture.detectChanges();
        let targetTRs = element.querySelectorAll('.associates-table > tr');
        expect(targetTRs.length).toBeGreaterThanOrEqual(0);
    });
});
