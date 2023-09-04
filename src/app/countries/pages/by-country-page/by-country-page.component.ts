import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'pages-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public selectedC?: string;

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.selectedC = this.countriesService.cacheStorage.byCountry.term;
    this.countries = this.countriesService.cacheStorage.byCountry.countries;
  }

  searchByCountry( term: string ): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
