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

  getSearchUsers(usuario: string): Observable<userGit> {
    return this.http.get<any>(`${environment.urlGit}/users/${usuario}`)
      .pipe(catchError(this.handleError));
  }

  getReposUser(usuario: string): Observable<Array<repoUserGit>> {
    return this.http.get<any>(`${environment.urlGit}/users/${usuario}/repos`)
    .pipe(catchError(this.handleError));
  }


  public handleError(error: HttpErrorResponse) {
    return throwError('Ha ocurrido un error en el sistema');
  }
}
