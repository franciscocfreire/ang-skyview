import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";

import { Usuario } from './usuario';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private domainUrl = 'http://localhost:5000/' 
  private usuariosUrl = 'usuario';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  deleteUsuario( usuario : Usuario | number): Observable<Usuario> {
    const id = typeof usuario === 'number' ? usuario : usuario.idUsuario;
    const url = `${this.domainUrl}${this.usuariosUrl}/${id}`;
  
    return this.http.delete<Usuario>(url).pipe(
      tap(_ => this.log(`Usuario apgado id=${id}`)),
      catchError(this.handleError<Usuario>('usuario Apagado'))
    );
  }

  addUsuario( usuario : Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.domainUrl + this.usuariosUrl, usuario, this.httpOptions)
    .pipe(
      tap((newUsuario : Usuario) => this.log(`adicionado Usuario id=${newUsuario.idUsuario}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  getUsuarios(): Observable<Usuario[]> {    
    return this.http.get<Usuario[]>(this.domainUrl + this.usuariosUrl)
      .pipe(
        tap(_ => this.log('fetched usuarios pegando todos')),
        catchError(this.handleError<Usuario[]>('getUsuarios', []))
      );
  }

   /** GET hero by id. Return `undefined` when id not found */
   getUsuarioNo404<Data>(id: number): Observable<Usuario> {
    const url = `${this.domainUrl}${this.usuariosUrl}/?id=${id}`;
    return this.http.get<Usuario[]>(url)
      .pipe(
        map(usuarios => usuarios[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} usuario id=${id}`);
        }),
        catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
      );
  }


  getUsuario(id: number): Observable<Usuario> {
    
    
    const url = `${this.domainUrl}${this.usuariosUrl}/${id}`;

    return this.http.get<Usuario>(url).pipe(
      tap(_=> this.log(`fetched usuario idUsuario=${id} UM USUARIO`)),
      catchError(this.handleError<Usuario>(`getUsuario ERRO id=${id}`))
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(this.domainUrl + this.usuariosUrl, usuario, this.httpOptions)
    .pipe(
      tap(_=> this.log(`updated usuario id=${usuario.idUsuario}`)),
      catchError(this.handleError<any>('updateUsuario'))
    )
  }

  private log(message: string) {
    this.messageService.add(`UsuarioService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('oi passei aqui');
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
