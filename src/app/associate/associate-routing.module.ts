import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateComponent } from './associate.component';
import { AssociateAuthResolver } from './associate-auth-resolver.service';
import { AddAssociateComponent } from './add-associate/add-associate.component';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';

const routes: Routes = [
  {
    path: '',
    component: AssociateComponent,
    resolve: {
      isAuthenticated: AssociateAuthResolver
    },
    children: [
      {
        path: 'add',
        component: AddAssociateComponent
      },
      {
        path: 'edit/:id',
        component: EditAssociateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociateRoutingModule { }