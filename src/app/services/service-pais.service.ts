import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class ServicePaisService {

  constructor(private http: HttpClient) { }

  getPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map( (resp:any[]) => {
        return resp.map(pais => {
          return {
            nombre: pais.name,
            codigo: pais.alpha3Code,
            capital: pais.capital,
            region: pais.region,
            area: pais.area,

          }
        })
      })
    )
  }



}
