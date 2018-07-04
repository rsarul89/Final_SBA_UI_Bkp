import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

import { Errors, Associate, Skill, Associate_Skills, AssociateService, SkillService } from '../../core';
import { ModalService } from '../../shared';
import { fail } from 'assert';


@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit, OnDestroy {

  constructor(private router: Router
    , private route: ActivatedRoute
    , private associateService: AssociateService
    , private skillService: SkillService
    , private toastr: ToastrService
    , private modalService: ModalService) { }

  errors: Errors = { errors: {} };
  updateAssociate: Associate = new Associate();
  imgReset: boolean = true;
  id: number;
  addSkillName: string = '';
  searchSkills: string = '';
  public sub: Subscription;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getAssociate();
  }

  getAssociate() {
    let associate: Associate = {
      Associate_Id: this.id
    };
    this.associateService.GetAssociate(associate)
      .subscribe(data => {
        this.updateAssociate = data;
        if (this.updateAssociate.Pic != null)
          this.imgReset = false;
      },
      err => {
        this.toastr.error('Problem on getting associate', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.toastr.error('Invalid format', 'Error', {
        positionClass: 'toast-top-full-width'
      });
      this.updateAssociate.Pic = '';
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.imgReset = false;
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.updateAssociate.Pic = reader.result;
  }
  valueChanged(event: any, index: any) {
    let ranger = $('#rating-' + index);
    ranger.prev('span.slider-start').html(event);
  }
  AddSkill(): void {
    if (this.addSkillName != '') {
      let skill: Skill = {
        Skill_Id: 0,
        Skill_Name: this.addSkillName,
        Associate_Skills: null
      };
      this.skillService.AddSkill(skill)
        .subscribe(data => {
          if (data != null) {
            this.toastr.success('Skill added successfully', 'Success', {
              positionClass: 'toast-top-center'
            });
            let associateSkill: Associate_Skills = {
              Associate: null,
              Skill: data,
              Skill_Id: data.Skill_Id,
              Associate_Id: this.updateAssociate.Associate_Id,
              Rating: 0
            };
            this.updateAssociate.Associate_Skills.unshift(associateSkill);
          }
          else {
            this.toastr.info('Skill already exists', 'Info', {
              positionClass: 'toast-top-full-width'
            });
          }
        },
        err => {
          this.toastr.error('Problem on adding skill', 'Error', {
            positionClass: 'toast-top-full-width'
          });
          this.errors = err;
        });
        this.addSkillName = '';
    }
  }
  resetImage(): void {
    this.updateAssociate.Pic = '';
    this.imgReset = true;
  }
  Reset(): void {
    this.updateAssociate.Associate_Id = null;
    this.updateAssociate.Email = null;
    this.updateAssociate.Mobile = null;
    this.updateAssociate.Gender = null;
    this.updateAssociate.Other = null;
    this.updateAssociate.Remark = null;
    this.updateAssociate.Pic = null;
    this.updateAssociate.Name = null;
    this.updateAssociate.Strength = null;
    this.updateAssociate.Weakness = null;
    this.updateAssociate.Status_Green = false;
    this.updateAssociate.Status_Blue = false;
    this.updateAssociate.Status_Red = false;
    this.updateAssociate.Level_1 = false;
    this.updateAssociate.Level_2 = false;
    this.updateAssociate.Level_3 = false;
    this.updateAssociate.Pic = '';
    this.imgReset = true;
    $('.rating').val(0).prev('.slider-start').html('0');
  }
  Cancel(): void {
    this.router.navigateByUrl('/');
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  DeleteConfirm(modelId: string) {
    this.openModal(modelId);
  }
  Delete() {
    this.associateService.DeleteAssociate(this.updateAssociate)
      .subscribe(data => {
        this.toastr.success('Associate deleted successfully', 'Success', {
          positionClass: 'toast-top-center'
        });
        this.router.navigateByUrl('/');
      },
      err => {
        this.toastr.error('Problem on deleting associate', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }
  Update(): void {
    if (this.updateAssociate.Pic === undefined && localStorage.getItem("defaultImg")) {
      this.updateAssociate.Pic = localStorage.getItem("defaultImg");
    }
    this.associateService.UpdateAssociate(this.updateAssociate)
      .subscribe(data => {
        this.toastr.success('Associate updated successfully', 'Info', {
          positionClass: 'toast-top-full-width'
        });
        this.Reset();
      },
      err => {
        this.toastr.error('Problem on updating associate', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
        this.Reset();
      });
      this.router.navigateByUrl('/');
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
