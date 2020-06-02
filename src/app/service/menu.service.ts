import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  menu: any = [];

  getMenu(): Observable<any[]> {
    return this.httpClient.get<any[]>('assets/json/menu.json');
  }

  getItems(itemsId: string, projectId: string): Observable<string> {
    if (itemsId && projectId){
      return this.httpClient.get<string>(`assets/data/${itemsId}/${projectId}.html`, {responseType: 'text' as 'json'});
    }
    return of(null);
  }
}
