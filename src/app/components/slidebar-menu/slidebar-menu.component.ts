import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, mergeMap, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeValue } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slidebar-menu',
  templateUrl: './slidebar-menu.component.html',
})
export class SlidebarMenuComponent implements OnInit, OnDestroy {
  menuMetadata$: Observable<any[]>;
  projectsHTML$: Observable<SafeHtml>;
  pagesHTML$: Observable<SafeHtml>;

  private destroy$ = new Subject<void>();

  url: string;

  constructor(
    private menuService: MenuService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuMetadata$ = this.menuService.getMenu();
    this._loadPages();
    this._loadProjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onItemsClick(itemsId: string){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {itemsId},
    });
  }

  onProjectsClick(itemsId: string, procejtsId: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {itemsId, procejtsId},
    });
  }

  private _loadPages() {
    this.pagesHTML$ = this.activatedRoute.queryParams.pipe(
      switchMap((p) => this.menuService.getPages(p.itemsId)),
      takeUntil(this.destroy$),
      map((pt) => (pt ? this.sanitizer.bypassSecurityTrustHtml(pt) : null))
    );
  }

  private _loadProjects() {
    this.projectsHTML$ = this.activatedRoute.queryParams.pipe(
      switchMap((p) => this.menuService.getItems(p.itemsId, p.procejtsId)),
      takeUntil(this.destroy$),
      map((pt) => (pt ? this.sanitizer.bypassSecurityTrustHtml(pt) : null))
    );
  }
}
