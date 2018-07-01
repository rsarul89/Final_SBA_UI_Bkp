import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SkillComponent } from './skill.component';
import { SharedModule } from '../shared';
import { SkillRoutingModule } from './skill-routing.module';
import { SkillAuthResolver } from './skill-auth-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    SkillRoutingModule
  ],
  declarations: [
    SkillComponent
  ],
  providers: [ SkillAuthResolver ]
})
export class SkillModule {}