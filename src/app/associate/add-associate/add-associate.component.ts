import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

import { Errors, Associate, Skill, Associate_Skills, AssociateService, SkillService } from '../../core';
import { ModalService } from '../../shared';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {

  constructor(private router: Router
    , private associateService: AssociateService
    , private skillService: SkillService
    , private toastr: ToastrService
    , private modalService: ModalService) { }

  errors: Errors = { errors: {} };
  addAssociate: Associate = new Associate();
  skills: Array<Skill> = new Array<Skill>();
  associateSkills: Array<Associate_Skills> = Array<Associate_Skills>();
  imageSrc: string = '';
  statusGreenChecked: boolean = false;
  statusBlueChecked: boolean = false;
  statusRedChecked: boolean = false;
  level1Checked: boolean = false;
  level2Checked: boolean = false;
  level3Checked: boolean = false;
  imgReset: boolean = true;

  ngOnInit() {
    this.LoadSkills();
  }

  LoadSkills(): void {
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
      },
      err => {
        this.toastr.error('Problem on loading skills', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      }
      );
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.toastr.error('Invalid format', 'Error', {
        positionClass: 'toast-top-full-width'
      });
      this.imageSrc = '';
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.imgReset = false;
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.addAssociate.Pic = reader.result;
  }
  statusCheckChange(statusName) {
    this.addAssociate.Status_Green = (this.statusGreenChecked == true && statusName == 'green') ? 'Y' : 'N';
    this.addAssociate.Status_Blue = (this.statusBlueChecked == true && statusName == 'blue') ? 'Y' : 'N';
    this.addAssociate.Status_Red = (this.statusRedChecked == true && statusName == 'red') ? 'Y' : 'N';
  }
  levelCheckChange(levelName) {
    this.addAssociate.Level_1 = (this.level1Checked == true && levelName == 'L1') ? 'Y' : 'N';
    this.addAssociate.Level_2 = (this.level2Checked == true && levelName == 'L2') ? 'Y' : 'N';
    this.addAssociate.Level_3 = (this.level3Checked == true && levelName == 'L3') ? 'Y' : 'N';
  }
  addAssociateSkill(event: any, skill: Skill, index: any) {
    let ranger = $('#rating-' + index);
    ranger.prev('span.slider-start').html(ranger.val().toString());
    if (parseInt(event.target.value) > 0) {
      let assocSkill: Associate_Skills = {
        Associate: this.addAssociate,
        Skill: skill,
        Skill_Id: skill.Skill_Id,
        Associate_Id: this.addAssociate.Associate_Id,
        Rating: parseInt(event.target.value)
      };

      let alreadyExists = this.associateSkills.find(a => a.Skill_Id == skill.Skill_Id);
      if (alreadyExists) {
        let idx = this.associateSkills.indexOf(alreadyExists);
        this.associateSkills[idx] = assocSkill;
      }
      else {
        this.associateSkills.push(assocSkill);
      }
    }
    else if (parseInt(event.target.value) <= 0) {
      let alreadyExists1 = this.associateSkills.find(a => a.Skill_Id == skill.Skill_Id);
      if (alreadyExists1) {
        let idx = this.associateSkills.indexOf(alreadyExists1);
        this.associateSkills.splice(idx, 1);
      }
    }
  }
  resetImage(): void {
    this.imageSrc = '';
    this.imgReset = true;
  }
  Reset(): void {
    this.addAssociate = new Associate();
    this.associateSkills.splice(0, this.associateSkills.length);
    this.statusGreenChecked = false;
    this.statusBlueChecked = false;
    this.statusRedChecked = false;
    this.level1Checked = false;
    this.level2Checked = false;
    this.level3Checked = false;
    this.imageSrc = '';
    this.imgReset = true;
    $('.rating').val(0).prev('.slider-start').html('0');
  }
  Cancel(): void {
    this.router.navigateByUrl('/');
  }
  Save(): void {
    if (this.addAssociateSkill != null && this.addAssociateSkill.length > 0) {
      this.associateSkills.forEach(a => {
        this.addAssociate.Associate_Skills.push(a);
      });
    }
    this.associateService.AddAssociate(this.addAssociate)
      .subscribe(data => {
        this.toastr.success('Associate added successfully', 'Info', {
          positionClass: 'toast-top-full-width'
        });
      },
      err => {
        this.toastr.error('Problem on adding associate', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }
  statusAndLevelCheck(): boolean {
    if ((this.statusGreenChecked == true || this.statusBlueChecked == true || this.statusRedChecked == true) && (this.level1Checked == true || this.level2Checked == true || this.level3Checked == true)) {
      return true;
    }
    return false;
  }
}
