export interface Country {
  code: string;
  name: string;
}

export enum API {
  GET_COUNTRIES = 'https://api.openaq.org/v1/countries',
}