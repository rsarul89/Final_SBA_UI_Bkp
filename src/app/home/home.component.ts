import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Errors, HomeDashBoard, Associate, Skill, Associate_Skills, AssociateService, UserService } from '../core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Route } from '@angular/compiler/src/core';
import { ModalService } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router
    , private associateService: AssociateService
    , private userService: UserService
    , private toastr: ToastrService
    , private modalService: ModalService
    , private domSanitizer: DomSanitizer) { }

  isAuthenticated: boolean;
  searchText = '';
  filterName = 'Name';
  errors: Errors = { errors: {} };
  dashboardData: HomeDashBoard;
  associates: Array<Associate>;
  ass_skills: Array<Associate_Skills>;
  viewAssociate: Associate = new Associate();

  ngAfterViewInit() {
    $('.value').each(function () {
      var text = $(this).text();
      var title = $(this).closest('.block').attr('title');
      $(this).text(title);
      $(this).parent().css('width', text);
    });
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }
        this.LoadPageData();
      }
    );
  }

  LoadPageData() {
    this.dashboardData = {
      registeredUsers: 25001,
      femaleCandidates: 25,
      maleCandidates: 70,
      candidateFreshers: 20,
      candidatesRated: 2508,
      femaleCandidatesRated: 20,
      maleCandidatesRated: 80,
      level1candidates: 80,
      level2candidates: 10,
      level3candidates: 10
    };
    this.associates = Array<Associate>();

    this.associateService
      .GetAllAssociates()
      .subscribe(
      data => {
        this.associates = data;
        this.toastr.info('Associates Loaded Successfully', 'Info', {
          positionClass: 'toast-top-center'
        });
      },
      err => {
        this.errors = err;
      }
      );
  }

  Edit(associate: Associate) {
    this.router.navigate(['/associates/edit',associate.Associate_Id]);
  }
  Delete(associate: Associate, idx: number) {
    this.associateService.DeleteAssociate(associate)
      .subscribe(data => {
        this.toastr.info('Associate deleted successfully', 'Infomation', {
          positionClass: 'toast-top-center'
        });
        this.associates.splice(idx, 1);
      }, err => {
        this.toastr.error('Problem on deleting associate', 'Error', {
          positionClass: 'toast-top-full-width'
        });
        this.errors = err;
      });
  }
  addAssociate() {
    this.router.navigateByUrl('/associates/add');
  }
  View(associate: Associate) {
    this.viewAssociate = associate;
    this.openModal('associate-view-modal');
  }
  Filter(term, key) {
    this.filterName = key;
    this.searchText = term;
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  public hasData(): boolean {
    return (this.associates != null && this.associates.length > 0);
  }
}