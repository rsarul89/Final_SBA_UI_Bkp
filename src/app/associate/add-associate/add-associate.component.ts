import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { Errors, Associate, Skill, Associate_Skills, AssociateService, SkillService } from '../../core';
import { ModalService } from '../../shared';

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {

  constructor(private associateService: AssociateService
    , private skillService: SkillService
    , private toastr: ToastrService
    , private modalService: ModalService) { }

  errors: Errors = { errors: {} };
  addAssociate: Associate = new Associate();
  skills: Array<Skill> = new Array<Skill>();
  associateSkills: Array<Skill> = new Array<Skill>();
  imageSrc: string = '';
  statusGreenChecked: boolean = false;
  statusBlueChecked: boolean = false;
  statusRedChecked: boolean = false;
  level1Checked: boolean = false;
  level2Checked: boolean = false;
  level3Checked: boolean = false;

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
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.addAssociate.Pic = this.imageSrc;
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
  Reset(): void {

  }
  Cancel(): void {

  }
  Save(): void {

  }

}
