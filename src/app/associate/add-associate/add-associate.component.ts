import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

import { Errors, Associate, Skill, Associate_Skills, AssociateService, SkillService } from '../../core';
import { ModalService } from '../../shared';


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
    this.GetDefaultImage();
  }

  LoadSkills(): void {
    this.skillService
      .GetAllSkills()
      .subscribe(
      data => {
        if (data != null && data.length > 0) {
          this.skills = data;
          this.skills.sort((a, b) => {
            if (a.Skill_Name < b.Skill_Name) return -1;
            else if (a.Skill_Name > b.Skill_Name) return 1;
            else return 0;
          });
          this.addAssociate.Associate_Skills = new Array<Associate_Skills>(data.length);
          this.skills.forEach((skill, index) => {
            let asso = new Associate_Skills();
            asso.Rating = 0;
            asso.Skill_Id = skill.Skill_Id;
            asso.Associate = null;
            asso.Skill = null;
            this.addAssociate.Associate_Skills[index] = asso;
          });
        }
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
  valueChanged(event: any, index: any) {
    let ranger = $('#rating-' + index);
    ranger.prev('span.slider-start').html(event);
  }
  resetImage(): void {
    this.imageSrc = '';
    this.imgReset = true;
  }
  Reset(): void {
    this.addAssociate.Associate_Id = null;
    this.addAssociate.Email = null;
    this.addAssociate.Mobile = null;
    this.addAssociate.Gender = null;
    this.addAssociate.Other = null;
    this.addAssociate.Remark = null;
    this.addAssociate.Pic = null;
    this.addAssociate.Name = null;
    this.addAssociate.Strength = null;
    this.addAssociate.Weakness = null;
    this.addAssociate.Status_Green = 'N';
    this.addAssociate.Status_Blue = 'N';
    this.addAssociate.Status_Red = 'N';
    this.addAssociate.Level_1 = 'N';
    this.addAssociate.Level_2 = 'N';
    this.addAssociate.Level_3 = 'N';
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
    if (this.addAssociate.Associate_Skills != null && this.addAssociate.Associate_Skills.length > 0) {
      this.addAssociate.Associate_Skills.forEach((element, index) => {
        this.addAssociate.Associate_Skills[index].Associate_Id = this.addAssociate.Associate_Id;
      });
    }
    if (this.addAssociate.Pic === undefined && localStorage.getItem("defaultImg")) {
      this.addAssociate.Pic = localStorage.getItem("defaultImg");
    }
    this.associateService.AddAssociate(this.addAssociate)
      .subscribe(data => {
        if (data === null) {
          this.toastr.info('Associate already exists', 'Info', {
            positionClass: 'toast-top-center'
          });
        }
        else {
          this.toastr.success('Associate added successfully', 'Info', {
            positionClass: 'toast-top-full-width'
          });
        }
        this.Reset();
      },
      err => {
        this.toastr.error('Problem on adding associate', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
        this.Reset();
      });
  }
  GetDefaultImage(): void {
    let imageURL = '/assets/images/img_avatar3.jpg';
    let request = new XMLHttpRequest();
    request.open('GET', imageURL, true);
    request.responseType = 'blob';
    request.onload = function () {
      let reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload = function (e: any) {
        localStorage.setItem("defaultImg", e.target.result);
      };
    };
    request.send();
  }
  statusAndLevelCheck(): boolean {
    if ((this.statusGreenChecked == true || this.statusBlueChecked == true || this.statusRedChecked == true) && (this.level1Checked == true || this.level2Checked == true || this.level3Checked == true)) {
      return true;
    }
    return false;
  }
}
