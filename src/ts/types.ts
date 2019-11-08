export interface Country {
  code: string;
  name: string;
}

export interface City {
  name: string;
  country: string;
}

export interface Location {
  location: string;
  country: string;
  city: string;
  count: number;
  parameters: Parameter[];
}

export interface Measurement {
  location: string;
  city: string;
  country: string;
  parameter: Parameter;
  value: number;
  unit: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  date: {
    local: string;
  };
}

export enum Parameter {
  PM25 = 'pm25',
  PM10 = 'pm10',
  SO2 = 'so2',
  NO2 = 'no2',
  O3 = 'o3',
  CO = 'co',
  BC = 'bc'
}

export enum API {
  GET_COUNTRIES = 'https://api.openaq.org/v1/countries',
  GET_CITIES = 'https://api.openaq.org/v1/cities',
  GET_LOCATIONS = 'https://api.openaq.org/v1/locations',
  GET_MEASUREMENTS = 'https://api.openaq.org/v1/measurements',
}