import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Characters } from '../interfaces/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient,
               private translate: TranslateService,
               private utilities: UtilitiesService ) { }

  async getData<T>( endpoint: string  ) {

    return this.http.get<any>( environment.baseUrl + endpoint ).pipe(
        map((res: any) => res),
        catchError( (err: any, caught: Observable<any>) => this.handleError(err, caught, endpoint))
    );

  }

  handleError( error: any, caught: Observable<any>, endpoint: string ) {
    switch( error.status ) {
        case 400 : {
          return throwError(error);
        }
        case 401 : {
          return throwError(error);
        }
        case 404: {

          const msg = this.translate.instant('ERROR.notFound');
          this.utilities.notify( msg, 'toastDanger', 4000, 'warning' );
          return throwError(error);
        }
        case 409: {
          return throwError(error);
        }
        case 500 : {

          const msg = this.translate.instant('ERROR.serverError');
          this.utilities.notify( msg, 'toastDanger', 4000, 'warning' );
          return throwError(error);

        }
        default : {
          return throwError(error);
        }
    }
  }

  prepareFilter( objFilter: any ) {
    let paramFilter = '';
    for(const key in objFilter){
        if(objFilter.hasOwnProperty(key) && objFilter[key] != null  && objFilter[key] !== ''){
            paramFilter = paramFilter+`&${ key }=${ objFilter[key] }`;
        }
    }
    return paramFilter;
  }

  //FILTER
  getCharacters( page: number, objFilter: any ) {

   return this.getData<Characters>(`/character/?page=${ page } ${ this.prepareFilter( objFilter ) }`);

  }

}
