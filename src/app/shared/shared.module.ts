import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { SearchFilterPipe } from './pipes';
import { InlineEditComponent } from './inline-edit';
import { ModalComponent, ModalService } from './modal-popup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    RouterModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    SearchFilterPipe,
    InlineEditComponent,
    ModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective,
    SearchFilterPipe,
    InlineEditComponent,
    ModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class SharedModule { }