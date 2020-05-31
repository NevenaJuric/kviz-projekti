import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-slidebar-menu',
  templateUrl: './slidebar-menu.component.html'
})
export class SlidebarMenuComponent implements OnInit, OnDestroy {

  menuMetadata$: Observable<any[]>;

  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) { }

  ngOnInit() {

    this.menuMetadata$ = this.menuService.getMenu();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
