import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TmIconModule } from '../tm-icon/tm-icon.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { NavChildItemComponent } from './components/nav-child-item/nav-child-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SidebarComponent,
    NavItemComponent,
    NavChildItemComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    TmIconModule,
    MatExpansionModule,
    RouterModule,
    MatTooltipModule,
    TranslateModule
  ],
  exports: [SidebarComponent],
})
export class TmSidebarModule {}
