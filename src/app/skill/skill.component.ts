import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { Errors, Skill, Associate_Skills, SkillService } from '../core';
import { ModalService } from '../shared';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  constructor(private skillService: SkillService
    , private toastr: ToastrService
    , private modalService: ModalService) { }

  errors: Errors = { errors: {} };
  skills: Array<Skill> = new Array<Skill>();
  skill: Skill = new Skill();
  editSkill: Skill = new Skill();
  deleteSkill: Skill = new Skill();
  idx: number;

  ngOnInit() {
    this.skillService
      .GetAllSkills()
      .subscribe(
      data => {
        this.skills = data;
        this.skills.sort((a, b) => {
          if (a.Skill_Name < b.Skill_Name) return -1;
          else if (a.Skill_Name > b.Skill_Name) return 1;
          else return 0;
        });
        this.toastr.info('Skills loaded successfully', 'Infomation', {
          positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error('Problem on loading skills', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      }
      );
  }

  onFormSubmit() {
    this.skillService.AddSkill(this.skill)
      .subscribe(data => {
        if (data.Skill_Id > 0) {
          this.toastr.info('Skill added successfully', 'Infomation', {
            positionClass: 'toast-top-center'
          });
          this.skills.unshift(data);
          this.skill = new Skill();
        }
        else {
          this.toastr.error('Skill already exists', 'Infomation', {
            positionClass: 'toast-top-full-width'
          });
          this.skill = new Skill();
        }
      },
      err => {
        this.toastr.error('Problem on adding skill', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }

  onFormEditSubmit() {
    this.skillService.UpdateSkill(this.editSkill)
      .subscribe(data => {
        if (data != null) {
          let updateItem = this.skills.find(s => s.Skill_Id == data.Skill_Id);
          let index = this.skills.indexOf(updateItem);
          this.skills[index] = data;
          Object.assign(this.editSkill, data);
          this.toastr.info('Skill updated successfully', 'Infomation', {
            positionClass: 'toast-top-center'
          });
        }
      },
      err => {
        this.toastr.error('Problem on updating skill', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }

  resetSkillForm(skillForm: NgForm) {
    skillForm.resetForm();
  }

  Delete(skill: Skill, idx: number) {
    this.deleteSkill = skill;
    this.idx = idx;
    this.openModal('skill-delete-confirmation-modal');
  }

  OnDeleteConfirm() {
    this.skillService.DeleteSkill(this.deleteSkill)
      .subscribe(
      data => {
        this.toastr.info('Skill deleted successfully', 'Infomation', {
          positionClass: 'toast-top-center'
        });
        this.skills.splice(this.idx, 1);
      },
      err => {
        this.toastr.error('Problem on deleting skill', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }

  Edit(skill: Skill) {
    this.editSkill = skill;
    this.openModal('skill-edit-modal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
