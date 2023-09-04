import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import Region from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'pages-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export default class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedR?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    const cache = this.countriesService.cacheStorage.byRegion;
    this.selectedR = cache.term;
    this.countries = cache.countries;

    if( cache.countries.length === 0 ) {
      this.searchByRegion(this.selectedR);
    }
  }

  searchByRegion( region: Region ): void {
    this.isLoading = true;
    this.selectedR = region;

    this.countriesService.searchRegion(region)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
