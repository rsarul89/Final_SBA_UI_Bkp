import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillComponent } from './skill.component';
import { SkillAuthResolver } from './skill-auth-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SkillComponent,
    resolve: {
      isAuthenticated: SkillAuthResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule {}