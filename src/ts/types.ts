export interface Country {
  code: string;
  name: string;
}

export interface City {
  name: string;
  country: string;
}

export enum Parameter {
  PM25 = 'pm25',
  PM10 = 'pm10',
  SO2 = 'so2',
  NO2 = 'no2',
  O3 = 'o3',
  BC = 'bc'
}

export enum API {
  GET_COUNTRIES = 'https://api.openaq.org/v1/countries',
  GET_CITIES = 'https://api.openaq.org/v1/cities',
}