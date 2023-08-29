import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';
import { switchMap } from 'rxjs';

@Component({
  selector: 'pages-country-page',
  templateUrl: './country-page.component.html',
  styles: [
    '.translation-flag { width: 20px; height: auto; border: 1px solid black;}'
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  public translations = [
    {
      name: 'United Arab Emirates',
      code: 'ara',
      flag: 'https://flagcdn.com/ae.svg'
    },
    {
      name: 'Germany',
      code: 'deu',
      flag: 'https://flagcdn.com/de.svg'
    },
    {
      name: 'Estonia',
      code: 'est',
      flag: 'https://flagcdn.com/ee.svg'
    },
    {
      name: 'Finland',
      code: 'fin',
      flag: 'https://flagcdn.com/fi.svg'
    },
    {
      name: 'Italy',
      code: 'ita',
      flag: 'https://flagcdn.com/it.svg'
    },
    {
      name: 'Japan',
      code: 'jpn',
      flag: 'https://flagcdn.com/jp.svg'
    },
    {
      name: 'South Korea',
      code: 'kor',
      flag: 'https://flagcdn.com/kr.svg'
    },
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    public countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ) )
      )
      .subscribe( ( country: Country | null ) => {
        if ( !country ) return this.router.navigateByUrl('');

        return this.country = country;
      })
  }
}
