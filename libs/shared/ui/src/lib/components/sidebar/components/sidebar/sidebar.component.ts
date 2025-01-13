import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { slideInOut, sidenavContentInOut } from '../../animations';
import { NavigationDataModel } from '../../models/navigation-data.model';
import { MainSidebarDataModel } from '../../models';

@Component({
  selector: 'tm-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [slideInOut, sidenavContentInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SidebarComponent implements OnInit {
  navigationList = input.required<MainSidebarDataModel[]>();
  logoLink = input<string>();
  expanded = signal(true);
  sidenavState = signal('in-ltr');
  toggleIcon = signal('');

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.sidenavState.set(`in-${this.document.dir}`);
  }
  toggleSideNav() {
    this.sidenavState.set(this.sidenavState() === `out-${this.document.dir}` ?
      `in-${this.document.dir}` : `out-${this.document.dir}`
    );
    this.expanded.set(!this.expanded());
    this.toggleIcon.set(this.expanded() ? 'arrow_left' : 'arrow_right');
  }
}
