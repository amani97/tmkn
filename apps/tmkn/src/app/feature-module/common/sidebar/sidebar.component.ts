import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { SidebarService } from '../../../shared/sidebar/sidebar.service';
import { DataService } from '../../courses-management/data/data.service';
import { NavigationStart, Router, Event as RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from '../../../shared/common/common.service';
import { MenuItem, SubMenu, subMenus, url } from '../../courses-management/model/sidebar.model';
import { NgClass } from '@angular/common';
import { ScrollViewport, NgScrollbar } from 'ngx-scrollbar';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    standalone: true,
    imports: [ScrollViewport, NgScrollbar, RouterLink, NgClass, RouterLinkActive]
})
export class SidebarComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  public expandMenu = false;
  currentUrl = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public side_bar_data: Array<any> = [];

  constructor(
    private sidebar: SidebarService,
    private data: DataService,
    private router: Router,
    private common: CommonService
  ) {

    this.sidebar.expandSideBar.subscribe((res: boolean) => {
      this.expandMenu = res;
    });
    this.side_bar_data = this.data.sidebarData1;
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
  }




  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
      // this.sidebar.sideBarPosition.next('false');
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }
  currentOpenSecondMenu: MenuItem | null = null;

  expandSubMenus(menu: MenuItem): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.forEach((mainMenus: MenuItem) => {
      mainMenus.menu.forEach((resMenu: SubMenu) => {
        if (resMenu.menuValue === menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
    // this.side_bar_data.forEach((mainMenu: any) => {
    //   mainMenu.menu.forEach((submenu: any) => {
    //     if (submenu !== menu) {
    //       submenu.showSubRoute = false;
    //     }
    //   });
    // });
    // menu.showSubRoute = !menu.showSubRoute;

  }

  openMenuItem: MenuItem | null = null;
  openSubmenuOneItem: SubMenu[] | null = null;
  multiLevel1 = false;
  multiLevel2 = false;
  multiLevel3 = false;

  openMenu(menu: MenuItem): void {
    this.side_bar_data.forEach((mainMenu: any) => {
      if (mainMenu !== menu) {
        mainMenu.menu.forEach((submenu: subMenus) => {
          submenu.showSubRoute = false;
        });
      }
    });
    if (this.openMenuItem === menu) {
      this.openMenuItem = null;
    } else {
      this.openMenuItem = menu;
    }
  }

  openSubmenuOne(subMenus: SubMenu[]): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }

  multiLevelOne() {
    this.multiLevel1 = !this.multiLevel1;
  }
  multiLevelTwo() {
    this.multiLevel2 = !this.multiLevel2;
  }
  multiLevelThree() {
    this.multiLevel3 = !this.multiLevel3;
  }
  ngOnInit() {}
}
