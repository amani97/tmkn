import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagechangeComponent } from './pagechange.component';

const routes: Routes = [{ path: '', component: PagechangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagechangeRoutingModule { }
