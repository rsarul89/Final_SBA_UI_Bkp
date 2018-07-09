import { async, inject, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable';
import { AddAssociateComponent } from './add-associate.component';
import { ModalService, ShowAuthedDirective } from '../../shared';
import { SkillService, ApiService, JwtService, UserService, JsonParserService, Skill, Associate_Skills, Associate, User, AssociateService } from '../../core';
import 'rxjs/add/observable/of';

describe('AddAssociateComponent', () => {
  let component: AddAssociateComponent;
  let fixture: ComponentFixture<AddAssociateComponent>;
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
    },
    {
      Skill_Id: 4,
      Skill_Name: 'TestSkill4',
      Associate_Skills: []
    }, {
      Skill_Id: 5,
      Skill_Name: 'TestSkill5',
      Associate_Skills: []
    }
  ];

  const mockAssociates: Array<Associate> = [
    {
      Associate_Id: 678456,
      Name: "TestAssociate1",
      Email: "Test@mail.com",
      Gender: "Male",
      Pic: null,
      Mobile: "9874562345",
      Status_Blue: true,
      Status_Green: false,
      Status_Red: false,
      Level_1: false,
      Level_2: true,
      Level_3: false,
      Remark: "",
      Weakness: "",
      Strength: "",
      Other: "",
      Associate_Skills: [
        {
          Id: 0,
          Associate_Id: 678456,
          Skill_Id: 1,
          Skill: {
            Skill_Id: 1,
            Skill_Name: 'TestSkill1',
            Associate_Skills: []
          },
          Associate: null,
          Rating: 5,
        },
        {
          Id: 0,
          Associate_Id: 678456,
          Skill_Id: 2,
          Skill: {
            Skill_Id: 2,
            Skill_Name: 'TestSkill2',
            Associate_Skills: []
          },
          Associate: null,
          Rating: 10,
        }]
    },
    {
      Associate_Id: 678457,
      Name: "TestAssociate2",
      Email: "Test@mail.com",
      Gender: "Female",
      Pic: null,
      Mobile: "9874552345",
      Status_Blue: false,
      Status_Green: true,
      Status_Red: false,
      Level_1: true,
      Level_2: false,
      Level_3: false,
      Remark: "",
      Weakness: "",
      Strength: "",
      Other: "",
      Associate_Skills: [
        {
          Id: 0,
          Associate_Id: 678457,
          Skill_Id: 3,
          Skill: {
            Skill_Id: 3,
            Skill_Name: 'TestSkill3',
            Associate_Skills: []
          },
          Associate: null,
          Rating: 15,
        },
        {
          Id: 0,
          Associate_Id: 678457,
          Skill_Id: 4,
          Skill: {
            Skill_Id: 4,
            Skill_Name: 'TestSkill4',
            Associate_Skills: []
          },
          Associate: null,
          Rating: 7,
        }]
    },
    {
      Associate_Id: 678458,
      Name: "TestAssociate3",
      Email: "Test@mail.com",
      Gender: "Female",
      Pic: null,
      Mobile: "9874462345",
      Status_Blue: false,
      Status_Green: false,
      Status_Red: true,
      Level_1: false,
      Level_2: false,
      Level_3: true,
      Remark: "",
      Weakness: "",
      Strength: "",
      Other: "",
      Associate_Skills: [
        {
          Id: 0,
          Associate_Id: 678458,
          Skill_Id: 5,
          Skill: {
            Skill_Id: 5,
            Skill_Name: 'TestSkill5',
            Associate_Skills: []
          },
          Associate: null,
          Rating: 5,
        },
        {
          Id: 0,
          Associate_Id: 678458,
          Skill_Id: 3,
          Skill: {
            Skill_Id: 3,
            Skill_Name: 'TestSkill3',
            Associate_Skills: []
          },
          Associate: null,
          Rating: 10,
        }]
    }
  ];

  let mockAssociatesService = {
    GetAllAssociates(): Observable<Array<Associate>> {
      return Observable.of(mockAssociates);
    },
    GetAssociate(associate: Associate): Observable<Associate> {
      return Observable.of(mockAssociates.find(x => x.Associate_Id
        == associate.Associate_Id));
    },
    AddAssociate(skill: Associate): Observable<Associate> {
      mockAssociates.unshift(skill);
      return Observable.of(skill);
    },
    UpdateAssociate(associate: Associate): Observable<Associate> {
      let item = mockAssociates.find(x => x.Associate_Id == associate.Associate_Id);
      let index = mockAssociates.indexOf(item);
      mockAssociates[index] = associate;
      return Observable.of(associate);
    },
    DeleteAssociate(associate: Associate): Observable<Associate> {
      let index = mockAssociates.indexOf(associate);
      mockAssociates.splice(index, 1);
      return Observable.of(new Associate());
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssociateComponent, ShowAuthedDirective],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, ToastrModule.forRoot()],
      providers: [ApiService, SkillService, JwtService, { provide: AssociateService, useValue: mockAssociatesService }, ToastrService, ModalService, JsonParserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should add new associate', async(inject([AssociateService], (associateService: AssociateService) => {
    const element = fixture.nativeElement;
    fixture.detectChanges();
    let associate: {
      Associate_Id: 678459,
      Name: "TestAssociate4",
      Email: "Test@mail.com",
      Gender: "Female",
      Pic: null,
      Mobile: "9874462345",
      Status_Blue: false,
      Status_Green: false,
      Status_Red: true,
      Level_1: false,
      Level_2: false,
      Level_3: true,
      Remark: "",
      Weakness: "",
      Strength: "",
      Other: "",
      Associate_Skills: [
        {
          Id: 0,
          Associate_Id: 678459,
          Skill_Id: 5,
          Skill: {
            Skill_Id: 5,
            Skill_Name: 'TestSkill5',
            Associate_Skills: null
          },
          Associate: null,
          Rating: 5,
        },
        {
          Id: 0,
          Associate_Id: 678459,
          Skill_Id: 4,
          Skill: {
            Skill_Id: 4,
            Skill_Name: 'TestSkill4',
            Associate_Skills: null
          },
          Associate: null,
          Rating: 10,
        }]
    };
    let response: Associate;
    associateService.AddAssociate(associate).subscribe(data => {
      response = data;
    });
    fixture.detectChanges();
    expect(mockAssociates[mockAssociates.length]).toEqual(associate);
  })));
});
