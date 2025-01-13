import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmTreeTableComponent } from './tree-table.component';

describe('TmTreeTableComponent', () => {
  let component: TmTreeTableComponent<any,any,any>;
  let fixture: ComponentFixture<TmTreeTableComponent<any,any,any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmTreeTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
