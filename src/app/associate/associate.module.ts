import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssociateComponent } from './associate.component';
import { SharedModule } from '../shared';
import { AssociateRoutingModule } from './associate-routing.module';
import { AssociateAuthResolver } from './associate-auth-resolver.service';
import { AddAssociateComponent } from './add-associate/add-associate.component';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';

@NgModule({
  imports: [
    SharedModule,
    AssociateRoutingModule
  ],
  declarations: [
    AssociateComponent,
    AddAssociateComponent,
    EditAssociateComponent
  ],
  providers: [ AssociateAuthResolver ]
})
export class AssociateModule {}