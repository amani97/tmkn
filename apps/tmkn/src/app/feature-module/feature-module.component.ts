import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event as RouterEvent, RouterOutlet } from '@angular/router';
import { SidebarService } from '../shared/sidebar/sidebar.service';
import { CommonService } from '../shared/common/common.service';
import { DataService } from './courses-management/data/data.service';
import { url } from './courses-management/model/pages.model';
import { SettingsService } from '../shared/settings/settings.service';
import { LayoutComponent } from './common/layout/layout.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { NgClass, NgIf } from '@angular/common';


@Component({
    selector: 'app-feature-module',
    templateUrl: './feature-module.component.html',
    styleUrl: './feature-module.component.scss',
    standalone: true,
    imports: [NgClass, NgIf, HeaderComponent, SidebarComponent, LayoutComponent, RouterOutlet]
})
export class FeatureModuleComponent {
  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  public sideBarActivePath = false;
  public themeMode: string = '';
  public navigationColor: string = '';
  public layoutMode: string = '';
  public fontColor: string = '';
  public TopColor : string = '';
  public darkTheme = false;
  public backgroundMode : string = '';


  base = '';
  page = '';
  last = '';
  public showDark = false;
  constructor(
    private Router: Router,
    private sidebar: SidebarService,
    private common: CommonService,
    private data: DataService,
    private settings: SettingsService,
    private renderer: Renderer2
  ) {
    this.sidebar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    this.sidebar.expandSideBar.subscribe((res: boolean) => {
      this.expandMenu = res;
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
      if (data instanceof NavigationEnd) {
        localStorage.removeItem('isMobileSidebar');
        this.mobileSidebar = false;
      }
    });
    this.settings.themeMode.subscribe((res: string) => {
      if (res == 'dark_mode') {
        this.renderer.addClass(document.body, 'darkmode-custom-cls');
      } else {
        this.renderer.removeClass(document.body, 'darkmode-custom-cls');
      }
    });
    this.sidebar.showDark.subscribe((res: string | boolean) => {
      if (res == 'true') {
        this.showDark = true;
      } else {
        this.showDark = false;
      }
    });
    this.settings.themeMode.subscribe((mode) => {
      this.themeMode = mode;
    });
    this.settings.navigationColor.subscribe((color) => {
      this.navigationColor = color;
    });
    this.settings.layoutMode.subscribe((layout) => {
      this.layoutMode = layout;
    });
    this.settings.fontColor.subscribe((color) => {
      this.fontColor = color;
    });
    this.settings.TopColor.subscribe((top) => {
      this.TopColor = top;
    });
    this.settings.backgroundMode.subscribe((background) => {
      this.backgroundMode = background;
    });

    this.getRoutes(this.Router);
  }
  private getRoutes(data: url): void {
    const splitVal = data.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    if(this.page === 'index' || this.page === 'teacher-dashboard' || this.page === 'student-dashboard' || this.page === 'parent-dashboard' ) {
      this.showPreloader = true;
          setTimeout(() => {
            this.showPreloader = false;
          }, 1000);
    }else
    {
      this.showPreloader = false;
    }

  }
  ngOnInit(): void {



  }
  showPreloader: boolean = false;

}
