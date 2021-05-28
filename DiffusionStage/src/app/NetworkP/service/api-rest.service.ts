import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../Model/user.model';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  //apiURL = 'http://192.168.1.2:5500/';
  localURL = 'http://193.251.23.107:5500/data';

  constructor( private http: HttpClient ) { }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

getUser(): Observable<User[]> {
  return this.http.get<User[]>( this.localURL + '/Devis/Utilisateurs')
  .pipe(
    retry(1),
    catchError(this.handleError)
  );
}

addUser(u: User): Observable<User> {
  return this.http.post<User>( this.localURL + '/Devis/Utilisateurs', this.userToJson(u))
  .pipe(
    retry(1),
    catchError(this.handleError)
  );
}

userToJson(u: User){
  let js: any = {'nom': u.nom, 'mdp': u.mdp, 'groupe': u.groupe};
  return js;
 }
}
