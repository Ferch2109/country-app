import { Country } from "./countries.interface"
import Region from './region.type';

export default interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion:  RegionCountries;
}

type TermCountries = {
  term: string,
  countries: Country[]
}

type RegionCountries = {
  term: Region,
  countries: Country[]
}
