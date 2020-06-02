import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, mergeMap, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slidebar-menu',
  templateUrl: './slidebar-menu.component.html',
})
export class SlidebarMenuComponent implements OnInit, OnDestroy {
  menuMetadata$: Observable<any[]>;
  projectsHTML$: Observable<SafeHtml>;

  private destroy$ = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuMetadata$ = this.menuService.getMenu();
    this._loadProjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onProjectsClick(itemsId: string, procejtsId: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {itemsId, procejtsId},
    });
  }

  private _loadProjects() {
    this.projectsHTML$ = this.activatedRoute.queryParams.pipe(
      switchMap((p) => this.menuService.getItems(p.itemsId, p.procejtsId)),
      takeUntil(this.destroy$),
      map((pt) => (pt ? this.sanitizer.bypassSecurityTrustHtml(pt) : null))
    );
  }
}
