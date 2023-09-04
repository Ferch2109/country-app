import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, of, delay, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import CacheStore from '../interfaces/cache-store.interface';
import Region from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStorage: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion:  { term: 'Africa', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStorage) );
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem( 'cacheStore' ) ) return;

    this.cacheStorage = JSON.parse( localStorage.getItem( 'cacheStore' )! );
  }

  private getCountriesRequest( searchTerm: string, term: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/${searchTerm}/${ term }`;

    return this.http.get<Country[]>(url)
      .pipe(
        // In case of error returns an empty array observable.
        catchError( error =>  of([]) ),
        delay( 2000 )
      );
  }

  searchCapital( term: string ): Observable<Country[]> {
    this.cacheStorage.byCapital.term = term;
    return this.getCountriesRequest('capital', term)
      .pipe(
        tap( countries => this.cacheStorage.byCapital = { term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountry( term: string ): Observable<Country[]> {
    return this.getCountriesRequest('name', term)
      .pipe(
        tap( countries => this.cacheStorage.byCountry = { term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion( term: Region ): Observable<Country[]> {
    return this.getCountriesRequest('region', term)
      .pipe(
        tap( countries => this.cacheStorage.byRegion = { term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        // In case of error returns an empty array observable.
        catchError( () =>  of(null) )
      );
  }
}
