export interface Country {
  code: string;
  name: string;
}

export interface City {
  name: string;
  country: string;
}

export enum API {
  GET_COUNTRIES = 'https://api.openaq.org/v1/countries',
  GET_CITIES = 'https://api.openaq.org/v1/cities',
}