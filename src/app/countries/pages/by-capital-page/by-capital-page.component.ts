import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'pages-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public selectedC?: string;

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.selectedC = this.countriesService.cacheStorage.byCapital.term;
    this.countries = this.countriesService.cacheStorage.byCapital.countries;
  }

  searchByCapital( term: string ): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
