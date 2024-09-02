import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { repoUserGit, userGit } from '../model/gitHub.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.tokenGit}`
  });

  getSearchUsers(usuario: string): Observable<userGit> {
    return this.http.get<userGit>(`${environment.urlGit}/users/${usuario}`, {headers: this.HttpHeaders})
      .pipe(catchError(this.handleError));
  }

  getReposUser(usuario: string): Observable<Array<repoUserGit>> {
    return this.http.get<Array<repoUserGit>>(`${environment.urlGit}/users/${usuario}/repos`, {headers: this.HttpHeaders})
    .pipe(catchError(this.handleError));
  }


  public handleError(error: HttpErrorResponse) {
    return throwError('Ha ocurrido un error en el sistema');
  }
}
