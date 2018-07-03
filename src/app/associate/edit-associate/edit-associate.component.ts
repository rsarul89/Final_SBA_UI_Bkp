import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

import { Errors, Associate, Skill, Associate_Skills, AssociateService, SkillService } from '../../core';
import { ModalService } from '../../shared';

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
