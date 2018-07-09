import { async, inject, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable';
import { SkillComponent } from './skill.component';
import { ModalService, ShowAuthedDirective } from '../shared';
import { SkillService, ApiService, JwtService, UserService, JsonParserService, Skill, Associate_Skills, Associate, User } from '../core';
import 'rxjs/add/observable/of';

describe('SkillComponent', () => {
    let component: SkillComponent;
    let fixture: ComponentFixture<SkillComponent>;
    const mockSkills: Array<Skill> = [
        {
            Skill_Id: 1,
            Skill_Name: 'TestSkill1',
            Associate_Skills: []
        },
        {
            Skill_Id: 2,
            Skill_Name: 'TestSkill2',
            Associate_Skills: []
        },
        {
            Skill_Id: 3,
            Skill_Name: 'TestSkill3',
            Associate_Skills: []
        }
    ];

    let mockSkillsService = {
        GetAllSkills(): Observable<Array<Skill>> {
            return Observable.of(mockSkills);
        },
        GetSkill(skill: Skill): Observable<Skill> {
            return Observable.of(mockSkills.find(x => x.Skill_Id
                == skill.Skill_Id));
        },
        AddSkill(skill: Skill): Observable<Skill> {
            mockSkills.unshift(skill);
            return Observable.of(skill);
        },
        UpdateSkill(skill: Skill): Observable<Skill> {
            let item = mockSkills.find(x => x.Skill_Id == skill.Skill_Id);
            let index = mockSkills.indexOf(item);
            mockSkills[index] = skill;
            return Observable.of(skill);
        },
        DeleteSkill(skill: Skill): Observable<Skill> {
            let index = mockSkills.indexOf(skill);
            mockSkills.splice(index, 1);
            return Observable.of(new Skill());
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SkillComponent, ShowAuthedDirective],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, ToastrModule.forRoot()],
            providers: [ApiService, JwtService, { provide: SkillService, useValue: mockSkillsService }, ToastrService, ModalService, JsonParserService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SkillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('it should get all skils', () => {
        component.ngOnInit();
        expect(component.skills).toEqual(mockSkills);
    });

    it('it should render skill list', () => {
        const element = fixture.nativeElement;
        fixture.detectChanges();
        expect(element.querySelectorAll('p.skillName').length).toBe(3);
    });

    it('it should add new skill', async(inject([SkillService], (skillService: SkillService) => {
        const element = fixture.nativeElement;
        element.querySelectorAll('#skillName').value = 'TestSkill4';
        fixture.detectChanges();
        let el = fixture.debugElement.query(By.css('.form-inline button[type="submit"]')).nativeElement.click();
        fixture.detectChanges();
        let skill: Skill = {
            Skill_Id: 4,
            Skill_Name: 'TestSkill4',
            Associate_Skills: []
        };
        let response: Skill;
        skillService.AddSkill(skill).subscribe(data => {
            response = data;
        });
        fixture.detectChanges();
        expect(component.skills).toEqual(mockSkills);
        expect(element.querySelectorAll('p.skillName').length - 1).toBe(4);
    })));

    it('it should update skill', async(inject([SkillService], (skillService: SkillService) => {
        const element = fixture.nativeElement;
        let updatedSkill: Skill = {
            Skill_Id: 4,
            Skill_Name: 'TestSkill4Updated',
            Associate_Skills: []
        };
        let response: Skill;
        skillService.UpdateSkill(updatedSkill).subscribe(data => {
            response = data;
        });
        fixture.detectChanges();
        expect(component.skills).toEqual(mockSkills);
        expect(component.skills[0].Skill_Name).toEqual('TestSkill4Updated');
        expect(element.querySelectorAll('p.skillName').length - 1).toBe(4);
    })));

    it('it should delete skill', async(inject([SkillService], (skillService: SkillService) => {
        const element = fixture.nativeElement;
        let deleteSkill: Skill = {
            Skill_Id: 4,
            Skill_Name: 'TestSkill4Updated',
            Associate_Skills: []
        };
        let response: Skill;
        skillService.DeleteSkill(deleteSkill).subscribe(data => {
            response = data;
        });
        fixture.detectChanges();
        expect(component.skills).toEqual(mockSkills);
        expect(element.querySelectorAll('p.skillName').length - 1).toBe(3);
    })));

    it('it should get a skill', async(inject([SkillService], (skillService: SkillService) => {
        const element = fixture.nativeElement;
        let updatedSkill: Skill = {
            Skill_Id: 4,
            Skill_Name: 'TestSkill4Updated',
            Associate_Skills: []
        };
        let response: Skill = new Skill();
        skillService.GetSkill(updatedSkill).subscribe(data => {
            response = data;
        });
        fixture.detectChanges();
        expect(component.skills).toEqual(mockSkills);
        expect(response).toEqual(updatedSkill);
        expect(element.querySelectorAll('p.skillName').length - 1).toBe(3);
    })));
});
